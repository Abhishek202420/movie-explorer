# 🎬 Movie Explorer & Watchlist

A full-stack web application where users can search for movies using live data from **The Movie Database (TMDB) API**, create an account, and save movies to a personal watchlist.

Built as a learning project to understand how a React frontend, a Node.js/Express backend, a third-party API, and a database all connect together in a real full-stack application.

---

## 🔗 Live Demo

- **Frontend:** _add your Vercel link here_
- **Backend API:** _add your Render link here_

---

## ✨ Features

- 🔍 Search for movies by title using the TMDB API
- 🔐 User signup and login with hashed passwords and JWT-based authentication
- ⭐ Save movies to a personal watchlist (only visible to the logged-in user)
- 🗑️ Remove movies from your watchlist
- 🔒 Protected routes — both on the frontend (redirects to login) and backend (token-verified API routes)
- 📱 Responsive movie grid with posters, titles, and release dates

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios
- Context API (for auth state)

**Backend**
- Node.js
- Express
- MongoDB with Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing

**External API**
- [TMDB API](https://www.themoviedb.org/documentation/api) for movie search and details

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure

```
movie-explorer/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── WatchlistItem.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── watchlist.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env (not committed)
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── watchlist.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    └── .env (not committed)
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/movie-explorer.git
cd movie-explorer
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
PORT=8000
TMDB_API_KEY=your_tmdb_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
```

Run the backend:
```bash
npm run dev
```
The API will run at `http://localhost:8000`.

### 3. Set up the frontend
```bash
cd ../frontend
npm install
npm run dev
```
The app will run at `http://localhost:5173`.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create a new user account |
| POST | `/api/auth/login` | Log in and receive a JWT |

### Movies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies/search?query=` | Search movies by title (via TMDB) |
| GET | `/api/movies/:id` | Get details for a specific movie |

### Watchlist (requires `Authorization: Bearer <token>` header)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/watchlist` | Get the logged-in user's watchlist |
| POST | `/api/watchlist` | Add a movie to the watchlist |
| DELETE | `/api/watchlist/:id` | Remove a movie from the watchlist |

---

## 🧠 What I Learned

- How to design a REST API with Express and connect it to MongoDB using Mongoose
- How authentication actually works under the hood: password hashing with bcrypt, issuing and verifying JWTs, and protecting routes with middleware
- How to safely integrate a third-party API by proxying requests through my own backend, keeping the API key server-side and never exposed to the browser
- How to manage global auth state in React using the Context API
- How to protect frontend routes based on login state using React Router
- How to deploy a full-stack app with separate frontend and backend hosting, and manage environment variables securely across environments

---

## 🔮 Possible Future Improvements

- Pagination for search results
- Movie details page with cast, trailer, and overview
- Filter watchlist by genre or release year
- "Mark as watched" status for watchlist items
- Unit and integration tests for backend routes

---

## 📄 License

This project is open source and available for learning purposes.
