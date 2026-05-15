import { create } from "zustand";

import Cookies from "js-cookie"

import { useLoginUserStore } from "./loginUserStore";

// we use getState() for aviding problem of classi use rule of hook

const userState = useLoginUserStore.getState();
const role = userState.user?.role;

// gat store cooks data  for save in filters 
// because when we trying press apply button on filter the data will gon 
// fro that we try this 

let savedFilter = null 

if (role === "STUDENT") savedFilter = Cookies.get('studentFilter') ? JSON.parse(Cookies.get('studentFilter')) : null 

if (role === "COLLEGE") savedFilter = Cookies.get('collegeFilter') ? JSON.parse(Cookies.get('collegeFilter')) : null 



export const useFilterStore = create((set) => ({
    
    isOpen: false,
    toggleFilter: () => set((state) => ({ isOpen: !state.isOpen })),
    closeFilter: () => set({ isOpen: false }),

    
    filters: savedFilter ||  {
        requiredCity: "", 
        requiredCourse: "",
        requiredExamCategory : "" , 
        requiredExamMarks : "" , 
        requiredStudentCast : "",
        status : ""
       
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