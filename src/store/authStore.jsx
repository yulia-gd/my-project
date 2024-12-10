import { create } from "zustand";
import axios from "axios";
import { useEstablishmentsStore } from "./establishmentsStore"; // Assuming the establishments store is in the same directory
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const response = await axios.post(
        "https://my-project-x98y.onrender.com/api/users/login",
        { email, password }
      );
      const userData = response.data.user;
      set({ user: userData, isAuthenticated: true });
      console.log(userData.savedEstablishments);
      // Directly set savedEstablishments from userData
      useEstablishmentsStore.setState({ savedEstablishments: userData.savedEstablishments });
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  register: async (name, email, password, birthYear, gender) => {
    try {
      if (!name || !email || !password || !birthYear || !gender) {
        console.error("All fields are required");
        return;
      }

      const response = await axios.post(
        "https://my-project-x98y.onrender.com/api/users/register",
        {
          name,
          email,
          password,
          birthYear,
          gender
        }
      );
      const userData = response.data.user;
      set({ user: userData, isAuthenticated: true });

      // Directly set savedEstablishments from userData
      useEstablishmentsStore.setState({ savedEstablishments: userData.savedEstablishments });
    } catch (error) {
      console.error("Registration error:", error);
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, savedEstablishments: [] });
  },

  updateUser: async (updatedData) => {
    try {
      // Отримання поточного користувача з стану
      const { user } = useAuthStore.getState();
      if (!user || !user.id) {
        console.error("User not authenticated or ID not found");
        return;
      }
  
      // Виконання PUT-запиту з використанням id користувача
      const response = await axios.put(
        `https://my-project-x98y.onrender.com/api/users/${user._id}`,
        {
          name: updatedData.name,
          birthYear: updatedData.birthYear,
          gender: updatedData.gender,
        }
      );
  
      // Оновлення користувача у стані
      set({ user: response.data.user });
    } catch (error) {
      console.error("Update user error:", error);
    }
  },
  
}));
