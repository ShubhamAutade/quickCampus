
import {College} from "../models/College.model.js"
import mongoose from "mongoose"


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


// display one college appter click on college on home page 

export const oneCollege =  async (req , res) => {
    try {


        // get college id from params
        const {id} = req.params


        // check id is present 

        if(!id) {
            return res.status(401).json({
                success : false,
                message : `please provide id`
            })
        }

        // check provider id is rely soported to mongoDb

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(401).json({
                success : false,
                message : `please provide valid id `
            })
        }

        // id is valid then find college

        const college = await College.findOne({_id : id}).select("name email contact profileImage city courses staff")
        .lean()

        // college is present 

        if(!college) {
            return res.status(400).json({
                success : false,
                message : `not found`
            })
        }


         return res.status(200).json({
                success : true,
                message : `college found success fully`,
                college
            })



        
    } catch (error) {

          return res.status(500).json({
            success : false ,
            message : `server problem to fetch particular college to student `
        })
        
    }
}



