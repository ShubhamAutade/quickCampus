import React, { useState } from 'react'
import { useLoginUserStore } from '../../storage/loginUserStore.js'
import axios from "axios"
import toast from "react-hot-toast"
import Navbar from "../../components/Navbar.jsx"

function Profile() {


  const [editProfile , setEditProfile] = useState(false)
  const user = useLoginUserStore((state) => state.user)

  const setUser = useLoginUserStore((state) => state.setUser)

  console.log( "user",user);

  const userFields = [
  { label: 'Full Name', key: 'name' },
 
  { label: 'Contact', key: 'contact' }, 
  { label: 'Cast Category', key: 'castCategory' }, 
  { label: 'Exam Category', key: 'examCategory' }, 
  { label: 'Marks', key: 'marks' }, 

]


const [formData , setFormData] = useState({
  name : user?.name || "",
  contact : user?.contact || "" , 
  castCategory  : user?.castCategory || "",
  examCategory : user?.examCategory || "", 
  marks : user?.marks || "" ,
  profilePhoto: null
 })
  

 const handleChange = (e) => {
  const {name,  value , files } = e.target

 if (name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }

  }


const handleSave = async () => {
  try {
    const data = new FormData() 

    data.append("name" , formData.name)
    data.append("contact" , formData.contact)
    data.append("castCategory" , formData.castCategory)
    data.append("examCategory" , formData.examCategory)
    data.append("marks" , formData.marks)

    if (formData.profilePhoto) {
        data.append("profilePhoto", formData.profilePhoto)
      }


    const response = await axios.patch("http://localhost:8090/api/v1/student/home/user/profile/update" , data , {
      withCredentials : true
    })

    console.log(response); 
    
    setUser(response?.data?.updateStudent)

    setEditProfile(false)

         toast.success(response?.data?.message || "update  successfully")
    
  } catch (err) {

   toast.error(err.response?.data?.message || "Update fail")
    
  }
}


  return (
<>
  {/* display nav bar  */}

  <Navbar />
  
  


    {/* // bg dive  */}
    <div className='bg-base-100 min-h-screen flex items-center justify-center pt-11'>
 
      {/* this is dive that show content */}
     <div className='bg-base-300 min-h-[80vh] w-full max-w-md flex flex-col justify-center items-center  rounded-2xl'>





    
    {/* profile */}
    {/* this div for profile THIS BOX  and in tha will on dve tah t for profile */}
    <div className='flex justify-center items-center pt-5 pb-5' > 

      <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white' >
        <img src={user?.profilePhoto || "https://via.placeholder.com/150"}></img>
      </div>

    </div>

    {/* this for wen update user to handale profile photo  */}

    {editProfile && (
          <div className="mb-4">
            <input 
              type="file" 
              name="profilePhoto" 
              className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs" 
              onChange={handleChange}
              accept="image/*"
            />
          </div>
        )}






  {/* name */}
    {/* this dive also box and in the under of dive have content  */}
    <div className='flex justify-center items-center'>

      <div>
        <p className='font-extrabold text-2xl text-base-content'>{user?.name}</p>
      </div>

    </div>





   {/* the main section div in this we sho like name  and user information */}
    <div className='w-full px-6 py-2 space-y-3'>

      {/* div for name   and this dive will be handel by map  */}

        {userFields.map((field , index)=> (<div key={index} className='bg-base-200 p-4 rounded-2xl shadow-inner border border-base-300 w-full'>

      
    {/* labe like name role */}
      <span className='text-[10px] font-black uppercase text-primary opacity-70'>
        {field.label}
      </span>

  
  {/* real data means user real info */}
  {/* we check is editProfile is true den we conert all this in to input tag */}

      {!editProfile ? (
        // 1. VIEW MODE: Sirf text dikhao
        <span className='text-lg font-extrabold text-base-content mt-1 block'>
          {user?.[field.key] || "N/A"}
        </span>
      ) : (
        // 2. EDIT MODE: Input box dikhao
        <input 
          type="text" 
          name={field.key}
          value={formData[field.key]}
          className="input input-ghost input-sm w-full p-0 mt-1 h-auto focus:bg-transparent text-lg font-extrabold text-base-content border-none focus:outline-none"
          placeholder={`Enter ${field.label}`}

          onChange={handleChange}
        />
      )}


    </div>) )}


     </div>






     {/* buttons */}

     {/* we handles all buttons in this div  */}

     <div>


      {/* handle this to state of editProfile */}

     { editProfile ?
     
     (
    
    <div className="flex gap-2 w-full px-6 pb-6">
      <button  className="btn btn-success flex-1 text-white"
      onClick={handleSave}>
        Save
      </button>
      <button onClick={() => setEditProfile(false)} className="btn btn-ghost">
        Cancel
      </button>
    </div>
  ) 
  : 
  (
    <div className="w-full px-6 pb-6">
      <button onClick={() => setEditProfile(true)} className="btn btn-primary w-full shadow-lg">
        Edit Profile
      </button>
    </div>
  ) }




     </div>

    
    


     </div>  {/*end of content the from like skelton */}

    </div> 
    
    </>
  )


}

export default Profile