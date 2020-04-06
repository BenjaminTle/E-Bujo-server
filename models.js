const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  email: String,
});


const bulletSchema = new Schema({
  bulletType: String,
  title: String,
  date: Number,
  createdOn: Number,
  lastModified: Number,
  time: Number,
  content: String,
});

const User = mongoose.model('user', userSchema); 
const Bullet = mongoose.model('bullet', bulletSchema)

module.exports = {
  User,
  Bullet
};
