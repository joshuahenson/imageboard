const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Image = new Schema({
  url: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  likes: [String],
  date: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('images', Image);
