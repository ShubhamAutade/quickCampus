import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useApplicationStore = create(
  persist(
    (set) => ({
      applications : null, // Default theme


      setApplication: (data) => set ({applications : data}),  // set response obj of applications 

      clearApplication : () => set ({data : null})

    }),
    {
      name: 'application-storage', // LocalStorage  name  to store 
    }
  )
)