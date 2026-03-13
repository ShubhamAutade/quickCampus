import React from 'react'
import { useLoginUserStore } from '../storage/loginUserStore'

function Home() {

  const user = useLoginUserStore((state) => state.user)

  return (

    <div className='flex items-center justify-center min-h-screen'>

        {user? (<img className='w-60 h-60 rounded-full object-cover border-4 border-primary' 
        alt='image'
        src = {user.profilePhoto}
        />) : (<p>No user Login</p>)}
  
    </div>
  )
}

export default Home