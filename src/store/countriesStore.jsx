import { create } from "zustand";
import axios from "axios";

export const useCountriesStore = create((set, get) => ({
  countries: [],
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),

  fetchCountries: async () => {
    try {
      const response = await axios.get(
        "https://my-project-x98y.onrender.com/api/countries"
      );
      set({ countries: response.data });
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  },

  fetchDishesByCountry: async (countryName) => {
    try {
      const lowerCaseCountryName = countryName.toLowerCase();
      const response = await axios.get(
        `https://my-project-x98y.onrender.com/api/dishes/${lowerCaseCountryName}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching dishes:", error);
      return [];
    }
  },
}));
