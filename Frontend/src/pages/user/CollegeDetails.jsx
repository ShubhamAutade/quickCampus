import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import useApplyCollege from '../../hooks/useApplyCollege';

import toast from 'react-hot-toast';


const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {submitApplication , loading :applyLoading } = useApplyCollege()

  // States
  const [college, setCollege] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(""); // Course selection ke liye
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleCollege = async () => {
      try {
        setLoading(true);
        // 🚩 Tera exact working URL
        const res = await axios.get(`http://localhost:8090/api/v1/student/home/${id}`, {
          withCredentials: true
        });
        setCollege(res.data.college);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSingleCollege();
  }, [id]);




  const handleApply = async () => {
    if (!selectedCourse) {
     toast.error("select course please")
      return;
    }
   
const success = await submitApplication(id , selectedCourse)

if(success) {
    setSelectedCourse("")
}

  };




  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-100 p-4 md:p-8">
        
        {/* Main Card Container */}
        <div className="card bg-base-200 shadow-xl border border-base-300 p-8 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* 1. Header (Logo & Name) */}
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img 
                src={college?.profilePhoto || "https://via.placeholder.com/150"} 
                alt="logo" 
              />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold mt-6 text-center uppercase tracking-tight">
            {college?.name}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mt-2 opacity-70">
             <span className="flex items-center gap-1">📍 {college?.city}</span>
             <span className="flex items-center gap-1">📧 {college?.email}</span>
             <span className="flex items-center gap-1">📞 {college?.contact}</span>
          </div>

          <div className="divider w-full mt-8 uppercase font-bold text-xs opacity-50">Choose a Course</div>

          {/* 2. Radio Button Selection Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            {college?.courses && college.courses.length > 0 ? (
              college.courses.map((course, index) => (
                <div 
                  key={index} 
                  className={`form-control border rounded-xl p-3 transition-all ${
                    selectedCourse === course ? 'border-primary bg-primary/5' : 'border-base-300'
                  }`}
                >
                  <label className="label cursor-pointer justify-start gap-4">
                    <input 
                      type="radio" 
                      name="college-course" 
                      className="radio radio-primary" 
                      value={course}
                      checked={selectedCourse === course}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    />
                    <span className="label-text font-bold text-lg">{course}</span>
                  </label>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center italic opacity-50">No courses listed.</p>
            )}
          </div>

          {/* 3. Apply Button (Right below courses) */}
          <div className="mt-12 w-full flex flex-col items-center">
            <button 
              onClick={handleApply}
              className={`btn btn-primary btn-wide rounded-full shadow-lg text-lg font-bold ${!selectedCourse && 'btn-disabled opacity-50'}`}
            >
              Apply Now
            </button>
            {selectedCourse && (
              <p className="text-sm mt-2 text-primary font-medium animate-pulse">
                Selected: {selectedCourse}
              </p>
            )}
          </div>

          <div className="divider w-full mt-12 uppercase font-bold text-xs opacity-50">Support & Management</div>

          {/* 4. Staff Section (Bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            {college?.Staff && college.Staff.length > 0 ? (
              college.Staff.map((person, index) => (
                <div key={index} className="bg-base-100 p-4 rounded-xl border border-base-300 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{person.name}</p>
                    <p className="text-xs opacity-50 italic">Verified Staff</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-mono font-bold">{person.mobile}</p>
                  
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center opacity-40">Staff details coming soon.</p>
            )}
          </div>

          <p className="text-[10px] opacity-30 mt-10">Last updated: {new Date(college?.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
};

export default CollegeDetails;