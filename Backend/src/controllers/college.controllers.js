
import { College } from "../models/College.model.js";
import { Student } from "../models/Student.model.js";
import { ApplicationStatus } from "../models/ApplicationStatus.model.js";


// college home page 

export const home = async (req ,res) => {
    try {

        // get college id 

        const collegeId = req.user.id


       // check college id is here 
        if(!collegeId) {
            return res.status(400).json({
            success : false ,
            message : `college id is not get from token `
        })
        }


    // get all list fo student tey apply this college 

    const studentsList = await ApplicationStatus.find({collegeId})
    .populate("studentId", "name email marks city" )
    .exec()

    // check any student apply or note 

    if(Object.keys(studentsList).length === 0) {
         return res.status(200).json({
            success : true ,
            message : `no any student apply yet `
        })
    }

     return res.status(200).json({
            success : true ,
            message : `your students list  `,
            studentsList
        })



        
        
    } catch (error) {

        return res.status(500).json({
            success : false ,
            message : `server fail to fetching list of students to dashboard`
        })
        
    }
}

