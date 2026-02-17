
import {College} from "../models/College.model.js"


// student Home page 


export const home = async (req , res) => {
    try {
        
        // get all colleges
        const allCollege =  await College.find({role : "COLLEGE"}).select("name city profilePhoto")
        .lean()


        // all college  is their

       if(allCollege.length ===  0) {

        return res.status(200).json({
            success : true,
            message : `no any college register yet`
        })
       }


       return res.status(200).json({
        success : true,
        message : `hay you are`,
        allCollege
       })


   


    } catch (error) {

        return res.status(500).json({
            success : false ,
            message : `server problem to fetch college to student home`
        })
        
    }
}



