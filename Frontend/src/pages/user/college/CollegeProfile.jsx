import React, { useState } from 'react'
import { useLoginUserStore } from '../../../storage/loginUserStore.js'
import axios from "axios"
import toast from "react-hot-toast"
import Navbar from "../../../components/Navbar.jsx"

function CollegeProfile() {
  const [editProfile, setEditProfile] = useState(false)
  const user = useLoginUserStore((state) => state.user)
  const setUser = useLoginUserStore((state) => state.setUser)

  // 🚩 College specific fields (Simple ones)
  const collegeFields = [
    { label: 'College Name', key: 'name' },
    { label: 'City', key: 'city' },
    { label: 'Contact', key: 'contact' },
    { label: 'Available Courses (Comma separated)', key: 'courses' },
  ]

  const [formData, setFormData] = useState({
    name: user?.name || "",
    city: user?.city || "",
    contact: user?.contact || "",
    courses: user?.courses?.join(", ") || "", // Array ko string mein badla
    profilePhoto: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSave = async () => {
  try {
    const data = new FormData()
    data.append("name", formData.name)
    data.append("city", formData.city)
    data.append("contact", formData.contact)
    
    
    const coursesArray = formData.courses.split(",").map(c => c.trim());
    
    // FormData mein array bhejne ke liye har item ko loop karke append karna padta hai
    coursesArray.forEach(course => {
        if(course) data.append("courses", course); 
    });

    if (formData.profilePhoto) {
      data.append("profilePhoto", formData.profilePhoto)
    }

    const response = await axios.patch("http://localhost:8090/api/v1/college/home/profile/update", data, {
      withCredentials: true
    })

    setUser(response?.data?.updatedUser)
    setEditProfile(false)
    toast.success(response?.data?.message || "College Profile Updated!")
  } catch (err) {
    toast.error(err.response?.data?.message || "Update failed")
  }
}

  return (
    <>
      <Navbar />
      
      <div className='bg-base-100 min-h-screen flex items-center justify-center pt-11 pb-10'>
        
        {/* Content Box (Skelton) */}
        <div className='bg-base-300 w-full max-w-md flex flex-col rounded-2xl  overflow-hidden'>

          {/* 1. Profile Photo Section */}
          <div className='flex flex-col justify-center items-center pt-8 pb-4 bg-base-200/50'> 
            <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-primary ring ring-primary ring-offset-base-300 ring-offset-2 shadow-xl'>
              <img 
                src={user?.profilePhoto || "https://via.placeholder.com/150"} 
                className="w-full h-full object-cover"
                alt="college logo"
              />
            </div>

            {editProfile && (
              <div className="mt-4 px-6 w-full max-w-xs">
                <input 
                  type="file" 
                  name="profilePhoto" 
                  className="file-input file-input-bordered file-input-primary file-input-sm w-full" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
            )}

            <div className='mt-4'>
              <p className='font-black text-2xl text-base-content uppercase tracking-tight'>{user?.name}</p>
              <p className='text-center text-xs font-bold text-primary opacity-60'>{user?.email}</p>
            </div>
          </div>

          {/* 2. Main Info Section */}
          <div className='w-full px-6 py-6 space-y-4'>
            
            {collegeFields.map((field, index) => (
              <div key={index} className='bg-base-200 p-4 rounded-2xl shadow-inner border border-base-100 w-full transition-all'>
                <span className='text-[10px] font-black uppercase text-primary opacity-70 tracking-widest'>
                  {field.label}
                </span>

                {!editProfile ? (
                  <span className='text-lg font-extrabold text-base-content mt-1 block'>
                    {field.key === 'courses' ? (user?.courses?.join(" • ") || "N/A") : (user?.[field.key] || "N/A")}
                  </span>
                ) : (
                  <input 
                    type="text" 
                    name={field.key}
                    value={formData[field.key]}
                    className="input input-ghost input-sm w-full p-0 mt-1 h-auto focus:bg-transparent text-lg font-extrabold text-base-content border-none focus:outline-none"
                    placeholder={`Enter ${field.label}`}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}

            {/* 3. Staff Section (Special handling for Array) */}
            <div className='bg-base-200 p-4 rounded-2xl shadow-inner border border-base-100 w-full'>
              <span className='text-[10px] font-black uppercase text-primary opacity-70 tracking-widest'>
                College Staff
              </span>
              <div className="mt-2 space-y-2">
                {user?.Staff?.length > 0 ? (
                  user.Staff.map((member, i) => (
                    <div key={i} className="flex justify-between items-center bg-base-300/50 p-2 rounded-lg border border-base-100">
                      <p className="text-sm font-bold text-base-content">{member.name}</p>
                      <p className="text-xs font-black text-secondary">{member.mobile}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm opacity-50">No staff added</p>
                )}
              </div>
            </div>

          </div>

          {/* 4. Action Buttons */}
          <div className="px-6 pb-6">
            {editProfile ? (
              <div className="flex gap-2 w-full">
                <button className="btn btn-success flex-1 text-white rounded-xl shadow-lg" onClick={handleSave}>
                  Save Changes
                </button>
                <button onClick={() => setEditProfile(false)} className="btn btn-ghost rounded-xl">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setEditProfile(true)} className="btn btn-primary w-full shadow-lg rounded-xl font-bold">
                Edit College Profile
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default CollegeProfile