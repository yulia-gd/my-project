import { create } from 'zustand';
import axios from 'axios';

export const useCountriesStore = create((set, get) => ({
  countries: [], // Сюди будемо зберігати дані країн
  selectedCountry: null, // Вибрана країна
  setSelectedCountry: (country) => set({ selectedCountry: country }),

  // Функція для завантаження країн з бекенду
  fetchCountries: async () => {
    try {
      const response = await axios.get('https://my-project-x98y.onrender.com/api/countries');
      set({ countries: response.data });
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  },

  // Функція для завантаження страв по назві країни
  fetchDishesByCountry: async (countryName) => {
    try {
      const lowerCaseCountryName = countryName.toLowerCase(); // Перетворюємо країну на малу літеру
      const response = await axios.get(`https://my-project-x98y.onrender.com/api/dishes/${lowerCaseCountryName}`);
      return response.data; // Повертає страви для країни
    } catch (error) {
      console.error('Error fetching dishes:', error);
      return []; // Якщо не вдалося отримати страви, повертається порожній масив
    }
  },
  
}));
