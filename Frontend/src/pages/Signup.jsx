import React from 'react'
import {useForm} from "react-hook-form"
import axios from "axios"


function Signup() {

  // get all tool of RHF

  const { register , handleSubmit , formState : {errors}} = useForm()


  // submit Handler

  const onSubmit = async (data) => {
   try {
     const response = await axios.post("http://127.0.0.1:8090/api/v1/auth/register" , data)
 
      alert("Registration Successful ");
       console.log("Backend Response:", response.data);
 
   } catch (err) {

     console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
    
   }
    
  }



  return (
    <div>Signup from 

   <form onSubmit = {handleSubmit(onSubmit)}>


{/* name */}
    <div> 

   <label >  Full Name   </label>

   <input 
   type = "text"
   placeholder='Enter Name'

   {...register ("name",{
    required : "please Enter Name",
    minLength : {value : 3 , message : "minimum 3 latter name"}
   })}/>  

{errors.name && <p> {errors.name.message} </p>}

</div>

{/* email */}

<div>

<label>Email</label>
<input
type='email'
placeholder='Enter Email'
{...register ("email" , {
  required : "please Enter email",

})}

/>

{errors.email && <p> {errors.email.message} </p>}
</div>

{/* Password */}
<div>
<label>Password</label>
<input 
type='password'
placeholder='Password'
{...register ("password", {
  required : "Please Enter password",
  minLength : {value : 6 , message : "password have minimum 6 character"}
})}

/>
{errors.password && <p> {errors.password.message} </p>}
</div>


{/* Role selection */}

<div>
<label > I am a.. </label>

<select
{...register ("role")}
>

  <option value={"STUDENT"}>Student</option>
  <option value={"COLLEGE"}>College</option>

</select>
</div>

{/* Submit Button */}


<button type='submit'>
  Submit
</button>

</form>


    </div>
  )
}

export default Signup