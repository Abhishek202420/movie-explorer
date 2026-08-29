import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export async function getWatchlist(token) {
  const response = await axios.get(`${API_BASE_URL}/api/watchlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function addToWatchlist(token, movie) {
  const response = await axios.post(
    `${API_BASE_URL}/api/watchlist`,
    movie,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function removeFromWatchlist(token, id) {
  const response = await axios.delete(`${API_BASE_URL}/api/watchlist/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}