import {College} from "../models/College.model.js"



//checking college all profile is completed aur note 

export const collegeProfileCompleted = async (req , res , next) =>  {

    try {

        // get user email to find and  check profile 

        const collegeEmail = req.user.email

        //finding in db 

        const user = await College.findOne({email : collegeEmail})

        // check student found by email 

        if(!user) {
                 return res.status(400).json({
            success : false ,
            message : `not found account by email ${collegeEmail}`
        })  
        }

        // check profile is completed OR not 


        const {name , email , courses , city , contact , Staff} = user


         if(!name || 
            !email || 
            !city || 
            !contact || 
            !courses || courses.length === 0 
            // || 
            // !Staff || Staff.length === 0
        ) {
            return res.status(403).json({
                success : false ,
                message : `please first complete profile `,
                user
            })
        }

        next()

        
    } catch (error) {

        return res.status(500).json({
            success : false , 
            message : `server problem in profile checking of college `
        })
        
    }
}