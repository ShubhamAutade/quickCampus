import React from 'react'
import {useNavigate } from 'react-router-dom'


function HeroCollege({ studentsList }) {

 const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      {/* Heading Section */}
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-primary">Applications</h1>
          <p className="opacity-50 text-sm font-bold">Total Students: {studentsList?.length || 0}</p>
        </div>
        <div className="badge badge-outline p-4 font-bold border-primary/30 uppercase text-xs">College View</div>
      </div>

      {/* Main List Container */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {studentsList && studentsList.length > 0 ? (
          studentsList.map((appli) => (
            <div 
              key={appli._id} 
              // 🚩 Changed to md:grid-cols-7
              className="grid grid-cols-1 md:grid-cols-7 md:grid-rows-2 gap-x-4 p-4 bg-base-200 rounded-3xl shadow-sm border border-base-300 items-center hover:border-primary transition-all duration-300 group"
            >
              {/* 1. Student Avatar Section */}
              <div className="md:row-span-2 flex items-center justify-center border-b md:border-b-0 md:border-r border-base-300/50 pb-4 md:pb-0">
                <div className={`avatar ${!appli.studentId?.profilePhoto ? 'placeholder' : ''}`}>
                  <div className="bg-primary text-primary-content rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                    {appli.studentId?.profilePhoto ? (
                      <img src={appli.studentId.profilePhoto} alt={appli.studentId?.name} className="object-cover" />
                    ) : (
                      <span className="text-2xl font-black">{appli.studentId?.name?.charAt(0)}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Student Name */}
              <div className="col-start-2 row-start-1 self-end mt-4 md:mt-0">
                <span className="text-[10px] font-black uppercase text-primary opacity-60">Student Name</span>
              </div>
              <div className="col-start-2 row-start-2 self-start">
                <p className="font-extrabold text-base-content text-lg truncate">{appli.studentId?.name}</p>
              </div>

              {/* 3. Course Name */}
              <div className="col-start-3 row-start-1 self-end">
                <span className="text-[10px] font-black uppercase text-primary opacity-60">Applied For</span>
              </div>
              <div className="col-start-3 row-start-2 self-start">
                <p className="font-bold text-base-content/80">{appli?.courseName}</p>
              </div>

              {/* 4. Student Marks */}
              <div className="col-start-4 row-start-1 self-end">
                <span className="text-[10px] font-black uppercase text-primary opacity-60">Score</span>
              </div>
              <div className="col-start-4 row-start-2 self-start">
                <p className="font-bold text-base-content/80">{appli.studentId?.marks || "0"} Marks</p>
              </div>

              {/* 5. Date */}
              <div className="col-start-5 row-start-1 self-end">
                <span className="text-[10px] font-black uppercase text-primary opacity-60">Date</span>
              </div>
              <div className="col-start-5 row-start-2 self-start">
                <p className="font-bold text-base-content/80 italic">
                  {new Date(appli?.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>

              {/* 6. Status */}
              <div className="col-start-6 row-start-1 self-end">
                <span className="text-[10px] font-black uppercase text-primary opacity-60">Status</span>
              </div>
              <div className="col-start-6 row-start-2 self-start">
                <div className={`badge badge-md font-black rounded-lg ${
                  appli?.status === 'Pending' ? 'bg-warning/20 text-warning border-warning/50' : 
                  appli?.status === 'Accepted' ? 'bg-success/20 text-success border-success/50' : 'bg-error/20 text-error border-error/50'
                }`}>
                  {appli?.status}
                </div>
              </div>

              {/* 7. 🚩 NEW: Action Button Column */}
              <div className="col-start-7 row-start-1 row-span-2 flex items-center justify-center">
                <button 
                  className="btn btn-primary btn-sm rounded-xl px-6 shadow-md hover:shadow-primary/20 transition-all font-bold"
                  onClick={() => navigate(`/application/${appli._id}`)
                  } 
                >
                  Details
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-base-200 rounded-[3rem] border-4 border-dashed border-base-300">
            <span className="text-8xl mb-4 grayscale opacity-40">📝</span>
            <p className="text-2xl font-black opacity-30 uppercase tracking-tighter">No Applications Received</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroCollege