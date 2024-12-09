import { create } from 'zustand';
import axios from 'axios';

export const useRegionsStore = create((set) => ({
  regions: [],
  selectedRegion: null,

  // Function to fetch regions from the backend
  fetchRegions: async () => {
    try {
      const response = await axios.get('https://my-project-x98y.onrender.com/api/regions'); // Change URL as needed
      set({ regions: response.data });
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  },

  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));
