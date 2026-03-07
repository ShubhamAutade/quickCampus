import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"

import { useNavigate } from 'react-router-dom';

function Signup() {
const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8090/api/v1/auth/register", data);
      alert("Registration Successful! 🎉");
      console.log("Backend Response:", response.data);
  
      // navigating /home  = home page 
    navigate('/home')

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8f3700] px-4 py-10">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account 🎓</h2>
          <p className="text-gray-500 mt-2">Join QuickCampus to explore your future</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text"
              placeholder='Enter Name'
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                errors.name ? 'border-red-500 ring-1 ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
              {...register("name", {
                required: "Please Enter Name",
                minLength: { value: 3, message: "Minimum 3 letters required" }
              })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium italic"> {errors.name.message} </p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type='email'
              placeholder='name@example.com'
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                errors.email ? 'border-red-500 ring-1 ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
              {...register("email", { required: "Please Enter email" })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium italic"> {errors.email.message} </p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type='password'
              placeholder='••••••••'
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                errors.password ? 'border-red-500 ring-1 ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
              {...register("password", {
                required: "Please Enter password",
                minLength: { value: 6, message: "Password must have at least 6 characters" }
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium italic"> {errors.password.message} </p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">I am a..</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
              {...register("role")}
            >
              <option value={"STUDENT"}>Student</option>
              <option value={"COLLEGE"}>College</option>
            </select>
          </div>

          {/* Submit Button */}
          <button 
            type='submit'
            className="w-full bg-[#2563eb] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-[#1d4ed8] active:scale-[0.98] transition-all duration-200"
          >
            Sign Up
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account? 
          <a href="/login" className="text-blue-600 font-bold hover:underline ml-1">Log In</a>
        </div>

      </div>
    </div>
  )
}

export default Signup