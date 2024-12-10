import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore"; // Assuming the auth store is in the same directory

// Магазин закладів
export const useEstablishmentsStore = create((set, get) => ({
  establishments: [],
  savedEstablishments: [],

  fetchEstablishments: async () => {
    try {
      const response = await axios.get("https://my-project-x98y.onrender.com/api/establishments");
      set({ establishments: response.data });
    } catch (error) {
      console.error("Error fetching establishments:", error);
    }
  },

  toggleSaved: async (id) => {
    try {
      const { user, isAuthenticated } = useAuthStore.getState(); // Отримання стану authStore
      if (!isAuthenticated) throw new Error("User is not authenticated");
  
      // Перевіряємо, чи заклад вже збережений
      const isAlreadySaved = get().savedEstablishments.includes(id);
  
      if (isAlreadySaved) {
        // Викликаємо DELETE-запит для видалення із збережених
        const response = await axios.delete(
          `https://my-project-x98y.onrender.com/api/users/${user.email}/remove-establishment`,
          { data: { establishmentId: id } } // Передаємо ID закладу в тілі запиту
        );
  
        // Оновлюємо список збережених закладів у стані
        set({
          savedEstablishments: get().savedEstablishments.filter(
            (estId) => estId !== id
          ),
        });
      } else {
        // Викликаємо POST-запит для додавання у збережені
        const response = await axios.post(
          `https://my-project-x98y.onrender.com/api/users/${user.email}/save-establishment`,
          { establishmentId: id }
        );
  
        // Додаємо до списку збережених закладів
        set({
          savedEstablishments: [...get().savedEstablishments, id],
        });
      }
  
      // Оновлюємо користувача у стані
      set({ user: response.data.user });
    } catch (error) {
      console.error("Error toggling saved establishment:", error);
    }
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
