import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from './api/watchlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const API_BASE_URL = 'http://localhost:8000';

// Wrapper that redirects to /login if there's no logged-in user
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Movie Explorer</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/watchlist">Watchlist</Link>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const { user, token } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_BASE_URL}/api/movies/search`, {
        params: { query },
      });
      setMovies(response.data);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching movies.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (movie) => {
    setSavingId(movie.id);
    setSaveMessage('');
    try {
      await addToWatchlist(token, {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
      });
      setSaveMessage(`Saved "${movie.title}" to your watchlist!`);
    } catch (err) {
      setSaveMessage(err.response?.data?.error || 'Failed to save movie');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="app">
      <h1>Movie Explorer</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {saveMessage && <p className="save-message">{saveMessage}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-poster">No image</div>
            )}
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            {user && (
              <button onClick={() => handleSave(movie)} disabled={savingId === movie.id}>
                {savingId === movie.id ? 'Saving...' : 'Save to Watchlist'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Placeholder for now — we'll build this out fully in the next step
function Watchlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const data = await getWatchlist(token);
        setItems(data);
      } catch (err) {
        setError('Failed to load watchlist');
      } finally {
        setLoading(false);
      }
    }
    fetchWatchlist();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      await removeFromWatchlist(token, id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError('Failed to remove movie');
    }
  };

  if (loading) return <div className="app"><p>Loading your watchlist...</p></div>;

  return (
    <div className="app">
      <h2>My Watchlist</h2>
      {error && <p className="error">{error}</p>}

      {items.length === 0 ? (
        <p>No movies saved yet. Go search for something to add!</p>
      ) : (
        <div className="movie-grid">
          {items.map((item) => (
            <div key={item._id} className="movie-card">
              {item.posterPath ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.posterPath}`}
                  alt={item.title}
                />
              ) : (
                <div className="no-poster">No image</div>
              )}
              <h3>{item.title}</h3>
              <p>{item.releaseDate}</p>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;