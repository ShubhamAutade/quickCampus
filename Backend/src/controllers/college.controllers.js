
import { College } from "../models/College.model.js";
import { Student } from "../models/Student.model.js";
import { ApplicationStatus } from "../models/ApplicationStatus.model.js";
import mongoose from "mongoose";
import { getFilterData } from "../utils/getFilterData.Helper.js";


// college home page 

export const home = async (req ,res) => {
    try {



         // get filter data 

         const filters = getFilterData(req.filter)




        // get college id 

        const collegeId = req.user.id


       // check college id is here 
        if(!collegeId) {
            return res.status(400).json({
            success : false ,
            message : `college id is not get from token `
        })
        }




        // this query will be merge two object 
        // this line from future of this time line 
        let query = {collegeId , ...filters} 



    // get all list fo student tey apply this college 

    const studentsList = await ApplicationStatus.find(query)
    .populate("studentId", "name email marks city" )
    .exec()

    // check any student apply or note 

    if(studentsList.length === 0) {
         return res.status(200).json({
            success : true ,
            message : Object.keys(filters).length !== 0 ? ` No students found matching your filters ${ JSON.stringify (filters )}` : `No students have applied to your college yet.`
        
        })
    }

     return res.status(200).json({
            success : true ,
            message : `your students list  `,
            studentsList ,
            filters
        })



        
        
    } catch (error) {

        return res.status(500).json({
            success : false ,
            message : `server fail to fetching list of students to dashboard`
        })
        
    }
}

// get college profile 

export const profile = async (req , res ) => {
    try {

        // get email 

        const {email} = req.user 

        // find the user 

        const user = await College.findOne({email})
        .select(" -password -createdAt -updatedAt -role ")
        .lean()
        .exec()


        // check is user exist 

        if(!user) {
            return res.status(404).json({
                success : false ,
                message : `not found user profile`
            })
        }


        return res.status(200).json({
            success : true,
            message : `user profile`,
            user
        })

        
    } catch (error) {

        return res.status(500).json({
            success : false ,
            message : `internal server error to load profile`
        })
        
    }
}

// update profile  

export const updateProfile = async (req , res) => {
    try { 

        // get college by id

        const {id} = req.user

        const updateData = req.body

        // checking body here

        
       if(updateData === undefined) {
        return res.status(400).json({
                success : false,
                message : `body is empty mens undefine `
            })
       }


        // req.body is empty 

        if(Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success : false,
                message : `no any changes to work`
            })
        }


        // updating profile
        const updatedUser = await College.findByIdAndUpdate(id , 
            {$set : updateData},
            {new : true , runValidators : true}
        ).select("-createdAt -updatedAt -password ")



        // checking update or note 
      if(!updatedUser){
         return res.status(404).json({
            success : false ,
            message : `something wrong wen updating college data`
        })
      }


       return res.status(200).json({
            success : true,
            message : `data updated success fully`,
            updatedUser
        })

        
    } catch (error) {
         return res.status(500).json({
            success : false ,
            message : `server fail to fetching profile page of college`
        })
        
    }
}


// take action button of particular student / application

export const application = async (req , res) => {
    try {

        // get application id 
        // ye id applicationStatus ki hai ok 

        const {applicationId} = req.params

        // get college id

        const loggedInCollegeId = req.user.id

        // check application id is valid 

        if(!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(404).json({
                success : false ,
                message : `please provide valid id`
            })
        }


        // get info of application 

        const application = await ApplicationStatus.findById(applicationId )
        .populate("studentId" , "name email marks city contact profilePhoto castCategory examCategory")
        .populate("collegeId", "name _id ")
        .exec()

        // check application is here 

        if(!application) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not found"
             });
        }



        // jis college ke uppar application aya hai vahi dekha ra ha hai na 


        if(application.collegeId._id.toString() !== loggedInCollegeId) {

            return res.status(403).json({
                success : false ,
                message : "Unauthorized: You cannot view applications from other colleges"
            })
        }


        return res.status(200).json({
            success : true , 
            message : "APPLICATION",
            application
        })
        
    } catch (error) {

        return res.status(500).json({
            success : false ,
            message : `something wrong in server to load application`
        })
        
    }
}

// application update status from pending / approve / regent
export const updateStatus = async (req , res ) => {
    try {

        // get application id 
        // ye id applicationStatus ki hai ok 

        const {applicationId} = req.params

        // get college id

        const loggedInCollegeId = req.user.id

        // get status to set 
        const {status} = req.body


 // checking status in body is undefine aur not 

        
       if(status === undefined) {
        return res.status(400).json({
                success : false,
                message : `body is empty mens undefine `
            })
       }


        // check application id is valid 

        if(!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(404).json({
                success : false ,
                message : `please provide valid id`
            })
        }


        // get info of application  

        const application = await ApplicationStatus.findById(applicationId )
        

        // check application is here 

        if(!application) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not found"
             });
        }



        // jis college ke uppar application aya hai vahi dekha ra ha hai na 


        if(application.collegeId._id.toString() !== loggedInCollegeId) {

            return res.status(403).json({
                success : false ,
                message : "Unauthorized: You cannot view applications from other colleges"
            })
        }


        // update   status 

        const updatedApplication = await ApplicationStatus.findByIdAndUpdate(applicationId, 
            {$set : {status : status}} ,
            {new : true , runValidators : true}
        )


        if(!updatedApplication) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not updated "
             });
        }


        return res.status(200).json({
            success : true , 
            message : "APPLICATION",
            updatedApplication
        })
        
    } catch (error) {
        
         return res.status(500).json({
            success : false ,
            message : `something wrong to update Status ${error}`
        })
    }
}


// filter

export const filter = async ( req , res) => {
    try {

      
        const currentFilter = req.filter


        return res.status(200).json({
            success : true,
            message :  `your filter for now`,
              currentFilter
        })


        
    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : `something wrong to filters page  ${error}`,
          
        })
        
    }
}


// set filter   means whe user set new filter and press uplod or submit button 

export const setFilter = async (req , res) =>
{
    try {


        // get filter data from body 

        const { requiredExamCategory , requiredExamMarks , requiredStudentCast  } = req.body


        

        //  validate body 
  
        if(Object.keys(req.body).length  === 0){

             // clearing cookie
            res.clearCookie("collegeFilter" , {
       
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })


            return res.status(200).json({
                success : true ,
                message : `no add any filter ,  filter is empty `
            })

        }

        // jo jo hoga vahi set karenge 

       const filterPayload = {}

       if(requiredExamCategory) filterPayload.requiredExamCategory = requiredExamCategory

       if(requiredExamMarks) filterPayload.requiredExamMarks = requiredExamMarks

       if(requiredStudentCast) filterPayload.requiredStudentCast = requiredStudentCast



       // set option
       const option = {
        httpOnly : true ,
        secure : true,
        sameSite : "None"
       }



       // and all set 
       return res.status(200).cookie("collegeFilter", JSON.stringify(filterPayload), option)
       .json({
        success : true,
        message : `filter applied successfully`,
        filterPayload
       })


        
    } catch (error) {

          return res.status(500).json({
            success : false ,
            message : `something wrong to add filters  ${error}`
        })
        
    }
}