const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Унікальний ідентифікатор країни
  name: { type: String, required: true }, // Назва країни
  region: { type: String, required: true }, // Регіон
  description: { type: String, required: true }, // Опис країни
  imageUrl: { type: String, required: true }, // Посилання на зображення країни
  traditionalDishes: { type: String, default: ""  }, // Традиційні страви країни
});

const Country =  mongoose.model('Country', countrySchema);

module.exports = Country;
