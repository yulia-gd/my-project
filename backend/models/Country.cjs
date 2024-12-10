const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true }, 
  region: { type: String, required: true }, 
  description: { type: String, required: true }, 
  imageUrl: { type: String, required: true }, 
  traditionalDishes: { type: [String], default: ""  }, 
});

const Country =  mongoose.model('Country', countrySchema);

module.exports = Country;
