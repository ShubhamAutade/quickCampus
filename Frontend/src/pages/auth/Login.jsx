import axios from 'axios'
import React from 'react'
import toast from "react-hot-toast"
import { useLoginUserStore } from '../../storage/loginUserStore'
import { useForm } from 'react-hook-form'
import { useNavigate , Link} from 'react-router-dom'

function Login() {
 
  const {setUser} = useLoginUserStore()

  const navigate = useNavigate()
 
  const {register , handleSubmit , formState : {errors}} = useForm() 

  const onSubmit = async (data) => {
    try {

      const response = await axios.post("http://localhost:8090/api/v1/auth/login" , data ,
         {
        withCredentials: true                 
      }
      )

      setUser(response.data.payload)
      
      toast.success(response?.data?.message || "Login successfully")

      navigate("/")
      
    } catch (err) {

      toast.error(err.response?.data?.message || "Login Failed")
    
    }
  } 
 
  return (  

<div className="hero bg-base-200 min-h-screen ">
      
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
          
          <form className="card-body " onSubmit={handleSubmit(onSubmit)}>

            {/* kar ke uppare wala messahe  */}

            <div className='flex items-center justify-center'>
    
             <h1 className='text-4xl font-extrabold text-primary'>Login</h1>

            </div>
           <div className="divider"></div>
            
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="password" 
                className="input input-bordered focus:input-primary" 
               
                 {...register("password", {
                required : "please enter password"
               })}
              />
              {errors.password && <p className='text-[#d30000] italic font-bold'>{errors.password.message}</p>}
              
            </div>

            
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white text-lg">
                Login
              </button>
            </div>

          
            <p className="text-center text-sm mt-4">
              Don't have an account? 
             <Link to="/signup" className="link link-primary font-bold ml-1">
              Signup
             </Link>
            </p>

          </form>
        </div>
        
      </div>
    
  )
}

export default Login