import { create } from "zustand";

import Cookies from "js-cookie"

// gat store cooks data  for save in filters 
// because when we trying press apply button on filter the data will gon 
// fro that we try this 

const savedFilter = Cookies.get('studentFilter') ? JSON.parse(Cookies.get('studentFilter')) : null 

export const useFilterStore = create((set) => ({
    
    isOpen: false,
    toggleFilter: () => set((state) => ({ isOpen: !state.isOpen })),
    closeFilter: () => set({ isOpen: false }),

    
    filters: savedFilter ||  {
        requiredCity: "", 
        requiredCourse: ""
       
    },

    
    setFilters: (data) => set((state) => ({
        filters: { ...state.filters, ...data }
    })),

    
    resetFilter: () => set({
        filters: {
            requiredCity: "",
            requiredCourse: ""
            
        }
    }),

    refreshKey : 0,  

  triggerRefresh : () => set ((state) => ({refreshKey : state.refreshKey + 1 }))


}));