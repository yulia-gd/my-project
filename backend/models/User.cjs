const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Хешований пароль
  birthYear: { type: Number, required: true },
  gender: { type: String, required: true },

  savedEstablishments: [{ type: String }], // Changed from ObjectId to String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
