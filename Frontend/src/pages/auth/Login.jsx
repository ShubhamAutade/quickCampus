import React from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8090/api/v1/auth/login", data);
      alert("Login Successful! 🎉");
      console.log("Backend : ", response.data);

      // navigating /home
      navigate("/home")


    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login Failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8f3700] px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back! 👋
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your details to login
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type='email'
                placeholder='Enter Email'
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                  errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                {...register("email", { required: "Please Enter Email" })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium italic">
                   {errors.email.message} 
                </p>
              )}
            </div>



            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type='password'
                placeholder='••••••••'
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200 ${
                  errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium italic">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>



          

          <button
            type='submit'
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? 
          <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login