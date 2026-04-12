import React from 'react';
import Cookies from "js-cookie"

import { useFilterStore } from '../storage/useFilterStore'; 

const FilterDrawer = () => {

  // get isOpen And closeFilter 
  const { isOpen, closeFilter , filters , setFilters , resetFilter  ,  triggerRefresh } = useFilterStore();


  // setting filter data in to cooke according to backend logic

  const handleApply = () => {

    Cookies.set('studentFilter' , JSON.stringify(filters))


    closeFilter()

    //window.location.reload()  // bad approach

   // new approach

   triggerRefresh ()
  }


  // functionality after click clear button
  const handleClear =   () => { 

    resetFilter();

    // remove cookies for backend will not get any type of cookies from frontend 
    Cookies.remove('studentFilter')
    
    closeFilter(); 

    //window.location.reload()  // bad approach

   // new approach 
     triggerRefresh()
  
  }


  return (
    <>
      
      {/* bluer effect */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm  z-index:100 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeFilter} // click on side scree close filter tab 
      ></div>

    {/* the screen the show side bar   */}
      <div className={`fixed top-16 left-0 h-full w-80 bg-base-100 z-index:110 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Drawer Content */}
        <div className="p-6 flex flex-col h-full">


         {/* div for set city */}
         <div className='form-control w-full mb-4'>

            <label className="label pr-3">
                 <span className="label-text font-bold text-base-content/70 uppercase text-xs">Enter City</span>
            </label>

          <input 
           type="text" 
           placeholder="e.g. Pune, Mumbai" 
           className="input input-bordered w-full focus:input-primary transition-all" 
           value={filters.requiredCity}
           onChange={(e) => setFilters({requiredCity : e.target.value.trimStart()})}
           
          
          />
         </div>


         {/* div for set course */}
         <div className='form-control w-full mb-4'>

            <label className="label pr-3">
                 <span className="label-text font-bold text-base-content/70 uppercase text-xs">Enter Course</span>
            </label>

          <input 
           type="text" 
           placeholder="e.g BCA , B.Tech" 
           className="input input-bordered w-full focus:input-primary transition-all" 
           value={filters.requiredCourse}
           onChange={(e) => setFilters({requiredCourse : e.target.value.trim()})}
          
          />
         </div>



          {/* dive for two buttons clear and apply */}
         <div className="flex gap-2 pt-4 border-t border-base-300">

            {/* clear button */}
             <button 
                onClick={handleClear} 
                className="btn btn-ghost flex-1 text-error hover:bg-error/10"
             > 
                Clear All 
             </button>


             {/* apply button */}
             <button className="btn btn-primary flex-1"
             onClick={handleApply}>
                Apply
             </button>
          </div>



        </div>
      </div>
    </>
  );
};

export default FilterDrawer;