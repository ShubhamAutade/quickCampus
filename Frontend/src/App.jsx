import { useEffect } from "react"
import {Routes, Route , Navigate } from "react-router-dom"
import Login from "./pages/auth/Login"
import Home from "./pages/Home"
import {Toaster} from "react-hot-toast"
import Signup from "./pages/auth/Signup"
import Profile from "./pages/user/Profile"
import { useLoginUserStore } from "./storage/loginUserStore"
import { useThemeStore } from "./storage/themeStore"
import MyApplicationsStatus from "./pages/user/MyApplicationsStatus"
import FilterDrawer from "./components/FilterDrawer"
import CollegeDetails from "./pages/user/CollegeDetails"
import SingleStudentDetails from "./pages/user/college/singleStudentDetails"
import CollegeProfile from "./pages/user/college/CollegeProfile"


function App() {

  const user = useLoginUserStore((state) => state.user)

  const theme = useThemeStore((state) => state.theme)

  // handale theme
  useEffect(() => {
   
    document.querySelector('html').setAttribute('data-theme', theme)
  }, [theme])
 

  return (
  
    <div className="min-h-screen bg-base-200">
      <Toaster position="top-center" />
      <Routes>

      <Route path="/" element = {user? <Home /> : <Navigate  to = '/login' />} />

      <Route  path="/login" element = {<Login />} />
       
      <Route path="/signup" element = {<Signup />} />

      <Route path="/profile" element = {user?.role === "STUDENT" ? <Profile /> : <Navigate to = '/' />} />

      <Route path="/applications" element = {user? <MyApplicationsStatus  /> : <Navigate to = '/login' />} />

      <Route path="/college/:id" element = {user? <CollegeDetails /> : <Navigate to = '/' />} />

      <Route path="/application/:applicationId" element = {user? <SingleStudentDetails /> : <Navigate to = '/' />} />

      <Route path="/college/profile" element = {user?.role === "COLLEGE" ? <CollegeProfile /> : <Navigate to = '/'/>} />


      </Routes>

      {user && <FilterDrawer />}
    </div>
  )
}

export default App
