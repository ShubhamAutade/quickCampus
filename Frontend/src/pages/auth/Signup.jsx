import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useLoginUserStore } from '../../storage/loginUserStore.js'
import { useForm } from 'react-hook-form'
import { useNavigate , Link } from 'react-router-dom'

function Signup() {

  // get fu of set user from store 
  const {setUser} = useLoginUserStore()
 
  // create useNavigate as navigate 
  const navigate = useNavigate()

  // get variable RHP
  const {register , handleSubmit , formState : {errors}} = useForm()

  // onSubmit fn
  const onSubmit = async (data) => {
    try {

      const response = await axios.post("http://localhost:8090/api/v1/auth/register", data , {
        withCredentials : true
      })

        setUser(response.data.payload)
        console.log(response.data.payload);
        

        toast.success(response?.data?.message || "Account created successfully")

      navigate("/")
      
    } catch (err) {

       toast.error(err.response?.data?.message || "Signup Failed")
       console.log(response.data);
       
      
    }
  }

   return (  

<div className="hero bg-base-200 min-h-screen ">
      
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
          
          <form className="card-body " onSubmit={handleSubmit(onSubmit)}>

            <div className='flex items-center justify-center'>
    
             <h1 className='text-4xl font-extrabold text-primary'>Create Account</h1>

            </div>
           <div className="divider"></div>

           {/* Name */}

           <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">User Name</span>
              </label>
            
              <input 
                type="text" 
                placeholder="Name" 
                className="input input-bordered focus:input-primary" 
              
               {...register("name", {
                required : "please enter name", 
                minLength : {value : 3 , message : "Name must be at least 3 characters" }
               })}

              />
                  {errors.name && <p className='text-[#d30000] italic font-bold '>{errors.name.message}</p>}
            </div>

            {/* email */}
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email Address</span>
              </label>
            
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="input input-bordered focus:input-primary" 
              
               {...register("email", {
                required : "please enter email"
               })}

              />
                  {errors.email && <p className='text-[#d30000] italic font-bold '>{errors.email.message}</p>}
            </div>

            {/* password */}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="password" 
                className="input input-bordered focus:input-primary" 
               
                 {...register("password", {
                required : "please enter password",
                minLength : {value : 6 , message : "Password must be at least 6 characters"},
                maxLength : {value : 20 , message : "Password cannot exceed 20 characters" }
               })}
              />
              {errors.password && <p className='text-[#d30000] italic font-bold'>{errors.password.message}</p>}
              
            </div>

            {/* drop down for role */}

            <div className='form-control '> 

               <label className="label">
                <span className="label-text font-bold">I am as a ...</span>
              </label>

              <select
          {...register("role", { required: "Please select a role" })}
          defaultValue=""
          className="select bg-[#c0c0c0] text-[#1a1a1a] select-bordered w-full"
        >

                <option disabled value='' >Pick a Role</option>
                <option value={"STUDENT"} >Student</option>
                <option value={"COLLEGE"}>College</option>
                
              </select>
               {errors.role && (
               <p className="text-red-600 italic font-bold mt-1">
                {errors.role.message}
          </p>
        )}

              </div>


            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white text-lg">
               Sign Up
              </button>
            </div>

          
            <p className="text-center text-sm mt-4">
             Already have an account? 
             <Link to="/login" className="link link-primary font-bold ml-1">
              Login
             </Link>
            </p>

          </form>
        </div>
        
      </div>
    
  )
}

export default Signup