import React, { useEffect, useState } from 'react'

import axios from "axios"

function Hero() {

//colleges
const [colleges , setColleges] = useState([])
const [loading ,setLoading] = useState(true)
const [error , setError] = useState(false)


// calling api 
useEffect( () => {

  const fetchColleges = async () => {
    try {

      setLoading(true)

      setError(null)

      const response = await axios.get("http://localhost:8090/api/v1/student/home" ,{
        withCredentials : true
      })

      setColleges(response.data.allCollege || [])

      console.log(response);
      
      
    } catch (err) {

      setError(err)
      
    }finally {
      setLoading(false)
    }

  }

  fetchColleges()

} , [] )




// if loading
if(loading) {
  return (
    <div className='min-h-screen'>

      {/* spinner */}
    <div className='flex items-center justify-center min-h-screen'>
      <span className="loading loading-spinner w-16 h-16"></span>
    </div>

    </div>
  )
}


// if error
if(error) {
  return (
     <div className='min-h-screen'>

      {/* spinner */}
    <div className='flex items-center justify-center min-h-screen'>
    {error.response?.data?.message? ( <p className='font-bold text-2xl  text-red-700'> {error.response.data.message} </p> ) : ( <p className='font-bold text-2xl text-red-700'>Failed to Fetch Colleges</p> ) }
    </div>

    </div>

  )
}



// all good 
  return (
   <div className='min-h-screen'>

  {/* Home Page Hading */}
  <div className='flex items-center justify-center pb-2.5'> 
    <p className='font-extrabold text-lg'>Explore Colleges </p>
  </div>

{/* gird to showing colleges */}
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px- lg:px-2'>
    
    {/* controlling displaying colleges  */}
    {colleges.length !== 0 ?
     (
      colleges.map((item) => (
      <div key={item._id} className="card bg-base-100 shadow-xl border border-base-300 hover:scale-105 transition-transform cursor-pointer">
        <figure className="px-4 pt-4">
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=500" alt="College" className="rounded-xl h-40 w-full object-cover" />
        </figure>
        <div className="card-body items-center text-center p-4">
          <h2 className="card-title  text-xl font-extrabold">{item.name || "N/A"}</h2>
          <p className='text-xs opacity-70'> City : {item.city ||  "N/A"}</p>
          <div className="card-actions">
            <button className="btn btn-primary btn-sm">View Details</button>
          </div>
        </div>
      </div>
    ))
  ) 
    :
    // no any college

     (
      <div className='flex flex-col  justify-center items-center text-center w-full min-h-screen col-span-full'>
        
        {/* Ek mast icon dikhao */}
        <div className="text-6xl mb-4">🔍</div>
        
        {/* Backend se aaya hua message dikhao */}
        <h2 className="text-2xl font-bold text-gray-500 text-center px-4">
          {  "No any college Found!"}
        </h2>
        
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary mt-6 btn-outline"
        >
          Try Again
        </button>
      </div>
    )

     }

  </div>


</div>
  )
}

export default Hero