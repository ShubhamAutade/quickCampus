// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup'; // 🚩 Page ko import kiya


function App() {
  return (
    <div className="App">
      <Routes>
       

       
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </div>
  );
}

export default App;