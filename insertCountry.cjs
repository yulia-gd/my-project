require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db.cjs'); // Підключення до MongoDB
const Region = require('./backend/models/Region.cjs'); // Модель для регіонів

// Підключення до MongoDB
connectDB();

// Нові URL зображень для регіонів
const updatedRegionImages = {
  americas: "https://png.pngtree.com/thumb_back/fw800/background/20240216/pngtree-beautiful-night-lighting-background-image_15627104.jpg",

};

// Функція для оновлення зображень
async function updateRegionImages() {
  try {
    for (const [id, imageUrl] of Object.entries(updatedRegionImages)) {
      const updatedRegion = await Region.findOneAndUpdate(
        { id }, // Умова пошуку
        { imageUrl }, // Нове значення для поля imageUrl
        { new: true } // Повернути оновлений документ
      );

      if (updatedRegion) {
        console.log(`Updated image for region "${updatedRegion.name}"`);
      } else {
        console.log(`Region with id "${id}" not found.`);
      }
    }

    console.log('Region images updated successfully!');
  } catch (error) {
    console.error('Error updating region images:', error);
  } finally {
    mongoose.disconnect(); // Закриття підключення до MongoDB після завершення
  }
}

// Виконання функції оновлення
updateRegionImages();
