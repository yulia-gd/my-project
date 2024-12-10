import { create } from "zustand";
import axios from "axios";

export const useRegionsStore = create((set) => ({
  regions: [],
  selectedRegion: null,

  fetchRegions: async () => {
    try {
      const response = await axios.get(
        "https://my-project-x98y.onrender.com/api/regions"
      );
      set({ regions: response.data });
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  },

  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));
