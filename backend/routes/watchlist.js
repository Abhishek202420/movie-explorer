const express = require('express');
const WatchlistItem = require('../models/WatchlistItem');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const items = await WatchlistItem.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
});

router.post('/', async (req, res) => {
  const { movieId, title, posterPath, releaseDate } = req.body;

  if (!movieId || !title) {
    return res.status(400).json({ error: 'movieId and title are required' });
  }

  try {
    const existing = await WatchlistItem.findOne({ userId: req.userId, movieId });
    if (existing) {
      return res.status(400).json({ error: 'Movie already in watchlist' });
    }

    const item = await WatchlistItem.create({
      userId: req.userId,
      movieId,
      title,
      posterPath,
      releaseDate,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to watchlist' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await WatchlistItem.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
});

module.exports = router;