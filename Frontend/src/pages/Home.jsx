import React from 'react'
import { useLoginUserStore } from '../storage/loginUserStore'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

function Home() {

  const user = useLoginUserStore((state) => state.user)

  return (

   <div className='min-h-screen bg-base-300'>
    
{/* nave bar */}
 <Navbar />

{/* hero section  */}
<Hero />

   </div>

  )
}

export default Home