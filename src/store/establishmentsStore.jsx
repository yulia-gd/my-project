import { create } from "zustand";
import axios from "axios";

export const useEstablishmentsStore = create((set, get) => ({
  establishments: [],
  savedEstablishments: [],

  fetchEstablishments: async () => {
    try {
      const response = await axios.get(
        "https://my-project-x98y.onrender.com/api/establishments"
      );
      set({ establishments: response.data });
    } catch (error) {
      console.error("Error fetching establishments:", error);
    }
  },

  toggleSaved: (id) => {
    set((state) => ({
      savedEstablishments: state.savedEstablishments.includes(id)
        ? state.savedEstablishments.filter((savedId) => savedId !== id)
        : [...state.savedEstablishments, id],
    }));
  },

  filterByType: (type) => {
    return get().establishments.filter((establishment) =>
      establishment.type.includes(type)
    );
  },

  filterByCountry: (country) => {
    return get().establishments.filter(
      (establishment) => establishment.country === country
    );
  },

  filterByCity: (city) => {
    return get().establishments.filter(
      (establishment) => establishment.address.split(",")[0] === city
    );
  },
}));
