const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  userId: String,
  displayName: String,
  userName: String,
  profilePhoto: String
});

module.exports = mongoose.model('users', User);
