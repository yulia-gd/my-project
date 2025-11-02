require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db.cjs');

const Region = require('./backend/models/Region.cjs');
const Country = require('./backend/models/Country.cjs');
const Dish = require('./backend/models/Dish.cjs');
const Establishment = require('./backend/models/Establishment.cjs');

connectDB();

const regionsData = [
  {
    id: "asia",
    name: "Asia",
    description: "Discover the rich and diverse culinary traditions of Asia, from the spicy curries of India to delicate sushi from Japan.",
    imageUrl: "https://st4.depositphotos.com/3823309/37967/i/450/depositphotos_379673.jpg",
    countries: [],
  },
  {
    id: "europe",
    name: "Europe",
    description: "Experience the sophisticated flavors of European cuisine, from Italian pasta to French pastries.",
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    countries: [],
  },
  {
    id: "americas",
    name: "The Americas",
    description: "From North to South, explore the diverse tastes of the Americas, including Mexican, Brazilian, and American classics.",
    imageUrl: "https://st3.depositphotos.com/13324256/34796/i/450/depositphotos_34796.jpg",
    countries: [],
  },
  {
    id: "africa",
    name: "Africa",
    description: "Discover the bold and flavorful cuisine of Africa, from North African tagines to West African stews.",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5a77c339be42d6cd6a7cc25a/africa.jpg",
    countries: [],
  },
  {
    id: "australia",
    name: "Australia",
    description: "Explore the unique flavors of Australian cuisine, including seafood, native ingredients, and fusion dishes.",
    imageUrl: "https://virtuoso-prod.dotcms.cloud/dA/6203a6f4553058353b831da9072fa104/australia.jpg",
    countries: [],
  },
];

const countriesData = [
  {
    id: "japan",
    name: "Japan",
    region: "asia",
    description: "Japanese cuisine features delicate flavors and artistic presentation, from sushi to ramen.",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    traditionalDishes: ["sushi", "ramen", "tempura"]
  },
  {
    id: "italy",
    name: "Italy",
    region: "europe",
    description: "Italian cuisine is known for its pasta, pizza, and rich regional flavors.",
    imageUrl: "https://images.unsplash.com/photo-1601924928376-3e3b6b94c0b3",
    traditionalDishes: ["pizza", "pasta", "lasagna"]
  },
  {
    id: "mexico",
    name: "Mexico",
    region: "americas",
    description: "Mexican cuisine offers spicy, colorful dishes like tacos and enchiladas.",
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73b8d27a9b7b",
    traditionalDishes: ["tacos", "enchiladas", "guacamole"]
  }
];

const dishesData = [
  {
    id: "sushi",
    name: "Sushi",
    description: "A Japanese dish of vinegared rice with seafood or vegetables.",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    country: "Japan"
  },
  {
    id: "pizza",
    name: "Pizza",
    description: "A classic Italian dish made with dough, tomato sauce, and cheese.",
    imageUrl: "https://images.unsplash.com/photo-1601924928376-3e3b6b94c0b3",
    country: "Italy"
  },
  {
    id: "tacos",
    name: "Tacos",
    description: "Traditional Mexican street food with tortilla and various fillings.",
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73b8d27a9b7b",
    country: "Mexico"
  }
];

const establishmentsData = [
  {
    id: "tokyo-sushi-bar",
    name: "Tokyo Sushi Bar",
    country: "Japan",
    type: ["restaurant"],
    description: "A cozy sushi restaurant offering traditional Japanese rolls and sashimi.",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    rating: 4.8,
    address: "1-1 Chiyoda, Tokyo, Japan"
  },
  {
    id: "roma-pizzeria",
    name: "Roma Pizzeria",
    country: "Italy",
    type: ["restaurant", "pizzeria"],
    description: "Authentic Italian pizza baked in a stone oven with fresh ingredients.",
    imageUrl: "https://images.unsplash.com/photo-1601924928376-3e3b6b94c0b3",
    rating: 4.6,
    address: "Via Roma 12, Rome, Italy"
  },
  {
    id: "mexico-taco-house",
    name: "Taco House",
    country: "Mexico",
    type: ["restaurant", "street food"],
    description: "Famous for handmade tacos with spicy sauces and guacamole.",
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73b8d27a9b7b",
    rating: 4.7,
    address: "Av. Juárez 20, Mexico City, Mexico"
  }
];

async function insertData() {
  try {
    await Region.deleteMany();
    await Country.deleteMany();
    await Dish.deleteMany();
    await Establishment.deleteMany();

    const insertedRegions = await Region.insertMany(regionsData);
    console.log("Regions inserted");

    await Country.insertMany(countriesData);
    console.log("Countries inserted");

    await Dish.insertMany(dishesData);
    console.log("Dishes inserted");

    await Establishment.insertMany(establishmentsData);
    console.log("Establishments inserted");

    console.log("All data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.disconnect();
  }
}

insertData();
