import React from 'react'
import {Routes , Route , Navigate} from "react-router-dom"
import HomePage from './page/HomePage'


function App() {
  return (

   <>

    <div
    className="bg-mauve-900 text-amber-100"
     
    >

      <Routes>

      <Route 
      path='/'
      element = {<HomePage/>}

      />

      </Routes>

    </div>


    </>
  )
}

export default App