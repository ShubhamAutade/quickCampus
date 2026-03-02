import {Student} from "../models/College.model.js"



//checking student  all profile is completed aur note 

export const collegeProfileCompleted = async (req , res , next) =>  {

    try {

        // get user email to find and  check profile 

        const studentEmail = req.user.email

        //finding in db 

        const user = await Student.findOne({email : studentEmail})

        // check student found by email 

        if(!user) {
                 return res.status(400).json({
            success : false ,
            message : `not found account by email ${studentEmail}`
        })  
        }

        // check profile is completed OR not 


        const {name , email ,  city , contact , castCategory , marks , examCategory} = user


         if(!name || !email || !city || !contact|| !castCategory || !marks || ! examCategory) {
            return res.status(400).json({
                success : false ,
                message : `please first complete profile`
            })
        }

        next()

        
    } catch (error) {

        return res.status(500).json({
            success : false , 
            message : `server problem in profile checking of student `
        })
        
    }
}