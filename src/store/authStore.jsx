import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email) => {
    try {
      const mockPhotoPath =
        "https://wiki.legalaid.gov.ua/images/thumb/0/0d/Person2.jpg/360px-Person2.jpg";
      const mockUser = {
        id: "1",
        email,
        name: "Yulia Huda",
        savedEstablishments: [],
        birthYear: 2005,
        gender: "Female",
        profilePhotoUrl: mockPhotoPath,
      };

      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  register: async (name, email, photoPath, birthYear, gender) => {
    try {
      const mockUser = {
        id: "2",
        email,
        name,
        savedEstablishments: [],
        birthYear,
        gender,
        profilePhotoUrl: photoPath,
      };

      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error("Registration error:", error);
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateUser: async (updatedData) => {
    try {
      set((state) => ({
        user: {
          ...state.user,
          ...updatedData,
        },
      }));
    } catch (error) {
      console.error("Update user error:", error);
    }
  },
}));
