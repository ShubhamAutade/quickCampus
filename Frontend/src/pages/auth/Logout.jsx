import React from 'react'
import axios from 'axios'
import {useForm} from "react-hook-form"

// get element of RHF



function Logout() {

  const {register , handleSubmit , formState : {errors}} = useForm()

const onSubmit = async (data) => {
  try {

    const response = await axios.get("http://127.0.0.1:8090/api/v1/auth/logout", data)

    alert("logout Successfully")

    console.log(response.data);
    
    
  } catch (err) {
  console.log(err);
  alert(err.response?.data?.message || "Not Log Out")


    
  }
}



  return (
    <div>

<form onSubmit={handleSubmit(onSubmit)}>

{/* logOut Button */}

<button type='submit'>
  logOut
</button>


</form>
    </div>
  )
}

export default Logout