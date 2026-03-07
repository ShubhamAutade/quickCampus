// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup'; // 🚩 Page ko import kiya
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Routes>
       

       
        <Route path="/signup" element={<Signup />} />

         <Route path="/login" element={<Login />} />

         <Route path="/logout" element={<Logout />} />

         <Route path='/home' element= {<Home/>} />
        
      </Routes>
    </div>
  );
}

export default App;