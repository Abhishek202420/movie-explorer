const mongoose = require('mongoose');

const watchlistItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  posterPath: { type: String },
  releaseDate: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('WatchlistItem', watchlistItemSchema);