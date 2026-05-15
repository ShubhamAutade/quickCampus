import React, { useEffect, useState } from 'react'

import {useNavigate} from "react-router-dom"

import axios from "axios"


import { useFilterStore } from '../storage/useFilterStore.js'; 

import {useLoginUserStore} from  '../storage/loginUserStore.js'
import HeroCollege from '../pages/user/college/HeroCollege.jsx';

function Hero() {

  const navigate = useNavigate()

  const user = useLoginUserStore((state) => state.user);
  const role = user?.role

//colleges
const [colleges , setColleges] = useState([])
const [studentApplications , setStudentApplications] =  useState([])
const [loading ,setLoading] = useState(true)
const [error , setError] = useState(false)

const triggerRefresh = useFilterStore((state) => state.triggerRefresh)

const  refreshKey = useFilterStore ((state) => state.refreshKey)




// calling api 
useEffect( () => {

  const fetchColleges = async () => {
    try {

      setLoading(true)

      setError(null)

      const apiUrl = role === "COLLEGE"? "http://localhost:8090/api/v1/college/home": "http://localhost:8090/api/v1/student/home"

      const response = await axios.get(apiUrl ,{
        withCredentials : true
      })

      console.log(response.data);
      

      setColleges(response.data.allCollege || [])

      setStudentApplications(response.data.studentsList)

      console.log(response);
      
      
    } catch (err) {

      setError(err)
      console.log(err.response);
      
      
    }finally {
      setLoading(false)
    }

  }

  fetchColleges()

} , [refreshKey] )




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
// if(error) {
//   return (
//      <div className='min-h-screen'>

//       {/* spinner */}
//     <div className='flex items-center justify-center min-h-screen'>
//     {error.response?.data?.message? ( <p className='font-bold text-2xl  text-red-700'> {error.response.data.message} </p> ) : ( <p className='font-bold text-2xl text-red-700'>Failed to Fetch Colleges</p> ) }
//     </div>

//     </div>

//   )
// }

// if error
if (error) {
  // Check karo kya ye "Incomplete Profile" wala error hai?
  const isProfileIncomplete = error.response?.status === 301 || error.response?.data?.message?.includes("profile");

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6 text-center'>
      
      {isProfileIncomplete ? (
        // 🚩 Case 1: Agar sirf profile complete nahi hai toh ye dikhao
        <div className="card bg-warning text-warning-content p-8 shadow-xl max-w-md">
          <h2 className="text-3xl mb-2">📋</h2>
          <h2 className="font-bold text-xl uppercase">Profile Incomplete</h2>
          <p className="mt-2 opacity-90">{error.response.data.message}</p>
          <button 
            onClick={() => navigate("/college/profile")} 
            className="btn btn-sm mt-6 btn-neutral"
          >
            Complete Profile Now
          </button>
        </div>
      ) : (
        // 🚩 Case 2: Agar koi aur error hai (Server down, etc.)
        <>
          <p className='font-bold text-2xl text-red-700'>
            {error.response?.data?.message || "Something went wrong"}
          </p>
          <button onClick={() => triggerRefresh()} className="btn btn-outline btn-error mt-4">
            Try Again
          </button>
        </>
      )}

    </div>
  );
}



// all good 

   

  return role === "STUDENT" ? (
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
          <img src= {item.profilePhoto} alt="College" className="rounded-xl h-40 w-full object-cover" />
        </figure>
        <div className="card-body items-center text-center p-4">
          <h2 className="card-title  text-xl font-extrabold">{item.name || "N/A"}</h2>
          <p className='text-large opacity-70'> City : {item.city ||  "N/A"}</p>
          <div className="card-actions">
            <button className="btn btn-primary btn-sm"
            onClick={() => navigate(`/college/${item._id}`)}
            >View Details</button>
          </div>
        </div>
      </div>
    ))
  ) 
    :
    // no any college

     (
      <div className='flex flex-col  justify-center items-center text-center w-full min-h-screen col-span-full'>
        
        {/* icon*/}
        <div className="text-6xl mb-4">🔍</div>
        
        {/* Backend message */}
        <h2 className="text-2xl font-bold text-gray-500 text-center px-4">
          {  "No any college Found!"}
        </h2>
        
        <button 
      
          onClick = { triggerRefresh}
          className="btn btn-primary mt-6 btn-outline"
        >
          Try Again
        </button>
      </div>
    )

     }

  </div>


</div>
  ) : <HeroCollege studentsList = {studentApplications} />
}

export default Hero