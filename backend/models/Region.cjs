const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true }, 
  description: { type: String, required: true }, 
  imageUrl: { type: String, required: true }, 
  countries: { type: [String], required: true }, 
});

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;
