require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db.cjs'); 
const Region = require('./backend/models/Region.cjs'); 
const Country = require('./backend/models/Country.cjs'); 


connectDB();

const regionsData = [
  {
    id: "asia",
    name: "Asia",
    description: "Discover the rich and diverse culinary traditions of Asia, from the spicy street food of Thailand to the delicate sushi of Japan.",
    imageUrl: "https://st4.depositphotos.com/3823309/37967/i/450/depositphotos_379673864-stock-photo-chicken-manchurian-pan-black-concrete.jpg",
    countries: ["Japan", "Thailand", "Vietnam", "China", "India"]
  },
  {
    id: "europe",
    name: "Europe",
    description: "Experience the sophisticated flavors of European cuisine, from Italian pasta to French pastries.",
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    countries: ["Italy", "France", "Spain", "Greece", "Ukraine"]
  },
  {
    id: "americas",
    name: "The Americas",
    description: "From North to South, explore the diverse tastes of the Americas, including Mexican tacos and Brazilian barbecue.",
    imageUrl: "https://st3.depositphotos.com/13324256/34796/i/450/depositphotos_347964044-stock-photo-delicious-hot-dog-american-flag.jpg",
    countries: ["Mexico", "Brazil", "Peru", "USA", "Argentina"]
  },
  {
    id: "africa",
    name: "Africa",
    description: "Discover the bold and flavorful cuisine of Africa, from North African spices to the hearty stews of South Africa.",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5a77c339be42d6cd6a7cc25a/1536529238412-1R7KEXBG820U5RLW2QTT/REPLACE+-+WEST+AFRICAN1.jpg?format=1500w", // Замініть на відповідне зображення
    countries: ["Nigeria", "South Africa", "Morocco", "Egypt", "Kenya"]
  },
  {
    id: "australia",
    name: "Australia",
    description: "Explore the unique flavors of Australian cuisine, including seafood, native bush foods, and modern Australian dishes.",
    imageUrl: "https://virtuoso-prod.dotcms.cloud/dA/6203a6f4553058353b831da9072fa104/heroImage1/Vert-Hero-Dahl-Daddys.jpg/webp", // Замініть на відповідне зображення
    countries: ["Australia"]
  }
];


async function insertRegionData() {
  try {
    for (const region of regionsData) {
      const newRegion = new Region({
        id: region.id,
        name: region.name,
        description: region.description,
        imageUrl: region.imageUrl,
        countries: region.countries
      });

      await newRegion.save();
      console.log(`Inserted region "${region.name}"`);
    }

    console.log('All regions inserted successfully!');
  } catch (error) {
    console.error('Error inserting regions:', error);
  } finally {
    mongoose.disconnect(); 
  }
}

insertRegionData();
