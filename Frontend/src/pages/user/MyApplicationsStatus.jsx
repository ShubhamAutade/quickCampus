import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import ApplicationItem from "../../components/Applications/ApplicationItem.jsx"
import {useStudentApplication} from "../../hooks/useApplicationsStatus.js"
import { useApplicationStore } from '../../storage/applicationStore.js'
 
function MyApplicationsStatus() {

// getting costume hook 

const {studentApplication} =  useStudentApplication ()

// get application from storage
const applications = useApplicationStore((state) => state.applications)

useEffect(() => {
  studentApplication()

}, [])



  return (
    <div className='min-h-screen bg-base-200 '>

      {/* show navbar  first  */}
      <Navbar />


      {/* div for showing text */}
      <div className='flex items-center justify-center mt-2 bg-base-300 shadow-md z-10'>
        <p className='text-2xl font-extrabold'> Your Applications </p>

      </div>




      {/* this div for showing your data  */}
      <div className=' flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-base-100 custom-scrollbar'>


                  {/* this component repeat according to list od applications status */}

                  {applications && applications.length > 0 ? 
                  (
                    applications.map((item) => (
                    <ApplicationItem key={item._id}  appli = {item} />

                   ))

                  )
                  
                  :
                  (

                     <div className="text-center py-20 opacity-40">
                    <p className="text-xl font-bold">No Applications Yet! </p>
                  </div>

                  )
                  }
                



      </div>





    </div>
  )
}

export default MyApplicationsStatus