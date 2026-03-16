
import {Routes, Route , Navigate } from "react-router-dom"
import Login from "./pages/auth/Login"
import Home from "./pages/Home"
import {Toaster} from "react-hot-toast"
import Signup from "./pages/auth/Signup"
import Profile from "./pages/user/Profile"
import { useLoginUserStore } from "./storage/loginUserStore"


function App() {

  const user = useLoginUserStore((state) => state.user)
 

  return (
  
    <div className="min-h-screen bg-base-200">
      <Toaster position="top-center" />
      <Routes>

      <Route path="/" element = {user? <Home /> : <Navigate  to = '/login' />} />

      <Route  path="/login" element = {<Login />} />
       
      <Route path="/signup" element = {<Signup />} />

      <Route path="/profile" element = {user? <Profile /> : <Navigate to = '/login' />} />


      </Routes>
    </div>
  )
}

export default App
