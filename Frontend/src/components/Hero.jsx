import React from 'react'

function Hero() {
  return (
   <div className='min-h-screen'>

  {/* Home Page Hading */}

  <div className='flex items-center justify-center pb-2.5'> 
    <p className='font-extrabold text-lg'>Explore Colleges </p>
  </div>

  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px- lg:px-2'>
    
    {/* Ek Sample Card (Ise tum loop kar sakte ho) */}
    {[1, 2, 3, 4, 5, 6, 7, 8 ,9,10,11,12,13,141,23,54,12,432,43,].map((item) => (
      <div key={item} className="card bg-base-100 shadow-xl border border-base-300 hover:scale-105 transition-transform cursor-pointer">
        <figure className="px-4 pt-4">
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=500" alt="College" className="rounded-xl h-40 w-full object-cover" />
        </figure>
        <div className="card-body items-center text-center p-4">
          <h2 className="card-title text-sm">Top Engineering College</h2>
          <p className='text-xs opacity-70'>Mumbai, Maharashtra</p>
          <div className="card-actions">
            <button className="btn btn-primary btn-sm">View Details</button>
          </div>
        </div>
      </div>
    ))}

  </div>
  {/* 🚩 CARDS GRID KHATAM */}

</div>
  )
}

export default Hero