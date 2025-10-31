import { create } from "zustand";
import axios from "axios";
import { useEstablishmentsStore } from "./establishmentsStore"; // Assuming the establishments store is in the same directory
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
   
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password }
      );
      const userData = response.data.user;
      set({ user: userData, isAuthenticated: true });
      useEstablishmentsStore.setState({ savedEstablishments: userData.savedEstablishments });
   
  },

  register: async (name, email, password, birthYear, gender) => {
      if (!name || !email || !password || !birthYear || !gender) {
        console.error("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/users/register",
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
      useEstablishmentsStore.setState({ savedEstablishments: userData.savedEstablishments });
    
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, savedEstablishments: [] });
  },

  updateUser: async (updatedData) => {
    try {
      const { user } = useAuthStore.getState();
      if (!user || !user.id) {
        console.error("User not authenticated or ID not found");
        return;
      }

      const response = await axios.put(
        `https://my-project-x98y.onrender.com/api/users/${user._id}`,
        {
          name: updatedData.name,
          birthYear: updatedData.birthYear,
          gender: updatedData.gender,
        }
      );
  
      set({ user: response.data.user });
    } catch (error) {
      console.error("Update user error:", error);
    }
  },
  
}));
