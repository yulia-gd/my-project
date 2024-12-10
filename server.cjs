const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./db.cjs');
const Establishment = require('./backend/models/Establishment.cjs');
const Country = require('./backend/models/Country.cjs');
const Dish = require('./backend/models/Dish.cjs');
const Region = require('./backend/models/Region.cjs');
const User = require('./backend/models/User.cjs')
require('dotenv').config();
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000;

// Підключення до бази даних
connectDB();

// Middleware
app.use(express.json());

// Додавання CORS middleware
app.use(cors());

// --- Маршрути для закладів ---

// Отримання всіх закладів
app.get('/api/establishments', async (req, res) => {
  try {
    const establishments = await Establishment.find();
    console.log(establishments);
    res.json(establishments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// --- Маршрути для регіонів ---

// Отримання всіх регіонів
app.get('/api/regions', async (req, res) => {
  try {
    const regions = await Region.find();
    console.log(regions);
    res.json(regions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// --- Маршрути для страв ---

// Отримання всіх страв
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    console.log(dishes);
    res.json(dishes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Отримання страв за назвою країни
app.get('/api/dishes/:countryName', async (req, res) => {
  try {
    let { countryName } = req.params;
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

    const dishes = await Dish.find({ country: countryName });
    console.log(dishes);
    res.json(dishes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// --- Маршрути для країн ---

// Отримання всіх країн
app.get('/api/countries', async (req, res) => {
  try {
    const countries = await Country.find();
    console.log(countries);
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, birthYear, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const newUser = new User({
      id: new mongoose.Types.ObjectId(),
      name,
      email,
      password, // Хешування пароля перед збереженням
      birthYear,
      gender,
      savedEstablishments: [],
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Server Error');
  }
});


// Авторизація користувача
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) { // Порівняння паролів потребує хешування
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Користувач авторизований, надаємо доступ
    res.status(200).json({ message: 'Login successful.', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server Error');
  }
});


// Оновлення даних користувача
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthYear, gender } = req.body; // Визначити тільки ті поля, які потрібно оновити

    // Онкологічні дані
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { name, birthYear, gender } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated successfully.', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Server Error');
  }
});


// Додавання закладу до списку збережених
// Додавання закладу до списку збережених
app.post('/api/users/:email/save-establishment', async (req, res) => {
  try {
    const { email } = req.params;
    const { establishmentId } = req.body; // Get the establishment ID from the request body

    const user = await User.findOne({ email }); // Correct method to find user by email

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!user.savedEstablishments.includes(establishmentId)) {
      user.savedEstablishments.push(establishmentId);
      await user.save();
    }

    res.status(200).json({ message: 'Establishment saved.', user });
  } catch (error) {
    console.error('Error saving establishment:', error);
    res.status(500).send('Server Error');
  }
});




// --- Маршрути для користувачів ---

// Отримання всіх користувачів
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// Видалення закладу із списку збережених
app.delete('/api/users/:email/remove-establishment', async (req, res) => {
  try {
    const { email } = req.params;
    const { establishmentId } = req.body; // ID закладу передається в тілі запиту

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Видаляємо заклад зі списку
    user.savedEstablishments = user.savedEstablishments.filter(
      (id) => id !== establishmentId
    );
    await user.save();

    res.status(200).json({ message: 'Establishment removed.', user });
  } catch (error) {
    console.error('Error removing establishment:', error);
    res.status(500).send('Server Error');
  }
});
