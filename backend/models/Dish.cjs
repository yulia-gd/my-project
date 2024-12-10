const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true }, 
  description: { type: String, required: true }, 
  imageUrl: { type: String, required: true }, 
  country: { type: String, required: true }, 
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
