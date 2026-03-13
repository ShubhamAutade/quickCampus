import {create} from "zustand"
import {persist} from "zustand/middleware"


export const useLoginUserStore = create(persist(  (set) => ({
    user : null ,

     setUser: (userData) => set({ user: userData }),

      logout: () => set({ user: null }),
}), 
{
name : "login-user", 
}
 ))