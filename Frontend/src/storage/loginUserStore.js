import {create} from "zustand"

export const useLoginUserStore = create((set) => ({
    user : null ,
    setUser : (userData) => set({user : userData}),
    logout : () => set({user : null})
}))