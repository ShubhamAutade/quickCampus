import zustand, { create } from "zustand"

const useFilterStorage = create((set) => ({

    filters : {
        city : "" , 
        course  : "",
    },

    setFilters : (data) => set ((state) => ({

        filters : {...state.filters, ...data}

    })),
    

    resetFilter : () => set({
        filters : {
            city : "",
            course : ""
        }
    })


}))