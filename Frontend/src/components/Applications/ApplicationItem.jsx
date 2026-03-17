import React from 'react'

function ApplicationItem({appli}) {
  return (
 <>

    <div className= 'grid grid-cols-6 grid-rows-2 gap-x-4 p-4 bg-base-200 rounded-2xl shadow-sm border border-base-300 items-center h-24'>



          {/* profile div section */}
        <div className=' row-span-2 flex items-center justify-center border-r border-base-300/50'>
        <div className='avatar'>
        <div className='w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src = {appli.collegeId?.profilePhoto} alt="college logo" />
          </div>
         </div>
         </div>


           {/* name section */}
           <div className='col-start-2 row-start-1 self-end'>
                  <span className='text-1xl font-black uppercase text-primary opacity-60'>College Name</span>
           </div>

           <div className='col-start-2 row-start-2 self-start'>
              <p className='font-bold text-base-content truncate'>{appli?.collegeId?.name}</p>
           </div>


            {/* appalled Course section name section */}
           <div className='col-start-3 row-start-1 self-end'>
                  <span className='text-1xl font-black uppercase text-primary opacity-60'>Course</span>
           </div>

           <div className='col-start-3 row-start-2 self-start'>
              <p className='font-bold text-base-content truncate'>{appli?.courseName}</p>
           </div>


           {/* college city */}
           <div className='col-start-4 row-start-1 self-end'>
                  <span className='text-1xl font-black uppercase text-primary opacity-60'>City</span>
           </div>

           <div className='col-start-4 row-start-2 self-start'>
              <p className='font-bold text-base-content truncate'>{appli?.collegeId?.city || "N/A"}</p>
           </div>


            {/* appalled date */}
           <div className='col-start-5 row-start-1 self-end'>
                  <span className='text-1xl font-black uppercase text-primary opacity-60'>A. Date</span>
           </div>

           <div className='col-start-5 row-start-2 self-start'>
              <p className='font-bold text-base-content truncate'>{new Date(appli?.createdAt).toLocaleDateString('en-IN')}</p>
           </div>


           {/* Status */}
           <div className='col-start-6 row-start-1 self-end'>
                  <span className='text-1xl font-black uppercase text-primary opacity-60'>Status</span>
           </div>

           <div className='col-start-6   row-start-2 self-start'>
              <p className='font-bold text-base-content truncate'>{appli?.status}</p>
           </div>




        </div> 

       

        </>
        
  )
}

export default ApplicationItem