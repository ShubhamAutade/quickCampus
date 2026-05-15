import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Navbar from '../../../components/Navbar'

function SingleStudentDetails() {
  const { applicationId } = useParams()
  const [currentStudent, setCurrentStudent] = useState(null)
  const [loading, setLoading] = useState(true) // Loading state add kiya

  useEffect(() => {
    const fetchOneStudent = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:8090/api/v1/college/home/application/${applicationId}`, { withCredentials: true })
        
        setCurrentStudent(res.data?.application)
        toast.success("Student profile loaded")
      } catch (err) {
        console.log(err)
        toast.error(err.response?.data?.message || "Failed to access student profile")
      } finally {
        setLoading(false)
      }
    }

    if (applicationId) fetchOneStudent()
  }, [applicationId])


  const updateStatus = async (status) => {

    try {

      const res = await axios.post( `http://localhost:8090/api/v1/college/home/application/${applicationId}/update-status` , {status} , {withCredentials : true} )

      console.log(res);

      toast.success(`application ${status} success fully`)
      
      
    } catch (err) {

      console.log(response);
      
      toast.error(response?.data?.message || "error to approve")

      
    }

  }







  // 🚩 STEP 1: SAFETY CHECK - Agar data load ho raha hai
  if (loading) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <span className="loading loading-spinner w-16 h-16 text-primary"></span>
      </div>
    )
  }

  // 🚩 STEP 2: SAFETY CHECK - Agar data nahi mila (null hai)
  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <p className="text-white text-xl">Student not found!</p>
      </div>
    )
  }

  // 🚩 Ab niche ka code tabhi chalega jab currentStudent mein data aa jayega
 return (
      
   <>
   <Navbar />


    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4 transition-colors duration-300">
      
      {/* 🚩 Card: Ab ye theme ke 'Base' color par rahega, black/white swap nahi karega */}
      <div className="bg-base-200 w-full max-w-md p-8 rounded-[2.5rem] border border-base-content/10 shadow-2xl">
        
        {/* Profile Photo */}
        <div className="flex justify-center mb-10">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-200 ring-offset-4">
              <img 
                src={currentStudent.studentId?.profilePhoto || "https://via.placeholder.com/150"} 
                alt="student" 
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Data Fields */}
        <div className="space-y-6 mb-12">
          
          {/* 🚩 Text: text-base-content apne aap mode ke hisab se ulta (Black/White) ho jata hai */}
          <div className="grid grid-cols-3 items-center">
            <span className="text-base-content text-xl font-medium opacity-80">Name</span>
            <div className="col-span-2 bg-base-100 border border-base-content/20 rounded-xl p-3 text-base-content font-bold truncate">
              {currentStudent.studentId?.name}
            </div>
          </div>

          {/* Email Row */}
          <div className="grid grid-cols-3 items-center">
            <span className="text-base-content text-xl font-medium opacity-80">Email</span>
            <div className="col-span-2 bg-base-100 border border-base-content/20 rounded-xl p-3 text-base-content font-bold truncate">
              {currentStudent.studentId?.email}
            </div>
          </div>

          {/* Contact Row */}
          <div className="grid grid-cols-3 items-center">
            <span className="text-base-content text-xl font-medium opacity-80">Contact</span>
            <div className="col-span-2 bg-base-100 border border-base-content/20 rounded-xl p-3 text-base-content font-bold">
              {currentStudent.studentId?.contact || "N/A"}
            </div>
          </div>

           {/* Castcatogary */}
          <div className="grid grid-cols-3 items-center">
            <span className="text-base-content text-xl font-medium opacity-80">Castcatogary</span>
            <div className="col-span-2 bg-base-100 border border-base-content/20 rounded-xl p-3 text-base-content font-bold">
              {currentStudent.studentId?.castCategory || "N/A"}
            </div>
          </div>

          {/* examCategory*/}
          <div className="grid grid-cols-3 items-center">
            <span className="text-base-content text-xl font-medium opacity-80">exam Category</span>
            <div className="col-span-2 bg-base-100 border border-base-content/20 rounded-xl p-3 text-base-content font-bold">
              {currentStudent.studentId?.examCategory|| "N/A"}
            </div>
          </div>


         {/* marks*/}
          <div className="grid grid-cols-3 items-center">
            <span className="text-base-content text-xl font-medium opacity-80">Marks</span>
            <div className="col-span-2 bg-base-100 border border-base-content/20 rounded-xl p-3 text-base-content font-bold">
              {currentStudent.studentId?.marks|| "N/A"}
            </div>
          </div>

         






        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-6">
          <button 
            className="flex-1 border-2 border-base-content text-base-content py-3 rounded-2xl text-xl font-bold hover:bg-success hover:text-white hover:border-success transition-all active:scale-95"
            onClick={ () =>   updateStatus("Approved") }
          >
            Approved
          </button>
          
          <button 
            className="flex-1 border-2 border-base-content text-base-content py-3 rounded-2xl text-xl font-bold hover:bg-error hover:text-white hover:border-error transition-all active:scale-95"
            onClick={() =>  updateStatus("Rejected")}
          >
            Rejected
          </button>
        </div>

      </div>
    </div>

    </>
  )
}

export default SingleStudentDetails