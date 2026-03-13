
import {Routes, Route , Navigate } from "react-router-dom"
import Login from "./pages/auth/Login"
import Home from "./pages/Home"
import {Toaster} from "react-hot-toast"
import Signup from "./pages/auth/Signup"


function App() {
 

  return (
  
    <div className="min-h-screen bg-base-200">
      <Toaster position="top-center" />
      <Routes>

      <Route path="/" element = {<Home />} />

      <Route  path="/login" element = {<Login />} />
       
      <Route path="/signup" element = {<Signup />} />


      </Routes>
    </div>
  )
}

export default App
