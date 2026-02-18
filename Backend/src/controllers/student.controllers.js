
import {College} from "../models/College.model.js"
import mongoose from "mongoose"
import { Student } from "../models/Student.model.js"
import {ApplicationStatus} from "../models/ApplicationStatus.model.js"


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


// look profile
// student seen their profile just seen onley on this 

export const profile = async (req, res) => {
    try {

        // get student email from req.user

        const {email} = req.user

        // check email here

        if(!email) {
             return res.status(400).json({
            success : false ,
            message : `not get email from token please login`
        })
        
        }

        // check account is their 

        const student = await Student.findOne({email}).select("name role profilePhoto contact  castCategory  examCategory marks")
        .lean()

        // check student found by email 

        if(!student) {
                 return res.status(400).json({
            success : false ,
            message : `not found account by email`
        })  
        }

        return res.status(200).json({
            success : true,
            message : "your profile details",
            student 
          })
        
    } catch (error) {

          return res.status(500).json({
            success : false ,
            message : `server problem to fetch student profile student ${error} `
        })
        
        
    }
}


// student profile update 
// in the app we have some facture when student try to apply college course 
// then we also check student profile is complete aur not 

export const updateProfile = async (req ,res) => {
    try {


        // get update data from body 

        const updateData = req.body

        // get student id

        const {id} = req.user

        // some facing error 
        // adding this line 
       // the error is what haapen when user not object 
       // mens updateData = null OR Undefine 
       // then not work Object.key() with null and undefine 
       // we check 

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


        if(!id) {
             return res.status(400).json({
                success : false,
                message : `please provide id`
            })
        }


        const updateStudent = await Student.findByIdAndUpdate(id ,
             {$set : updateData },
            {new : true , runValidators : true}
            ).select("-password -email -createdAt -updatedAt ")

            if(!updateData) {
                return res.status(400).json({
                success : false,
                message : `no update`
            })
            }

            return res.status(201).json({
                success : true,
                message : `profile update successfully`,
                updateStudent
            })
        
    } catch (error) {

        return res.status(500).json({
                success : false,
                message : `sever error to updata ${error}`
            })
        
    }
}

// student apply to particular college course


export const apply =  async (req , res) => {

    try {


       // get all information we need 

       // student id  
       const studentId = req.user.id
        
       // course name
        const {courseName} = req.body

        //college id
        const collegeId = req.params.id



        // check body is empty 

         if(req.body === undefined) {
        return res.status(400).json({
                success : false,
                message : `body is empty mens undefine `
            })
       }


         // check studentId is their

         if(!studentId){
              return res.status(401).json({
                success : false,
                message : `student id not gatting from token  data in req.user =  ${JSON.stringify(req.user)}`
            })
         }
         
        


        //check course present or not 

        if(!courseName) {
              return res.status(401).json({
                success : false,
                message : `please select course`
            })
        }

        // check id is present 

        if(!collegeId) {
            return res.status(401).json({
                success : false,
                message : `please  provide  college id`
            })
        }

         // check provider id is rely soported to mongoDb

        if(!mongoose.Types.ObjectId.isValid(collegeId)) {
            return res.status(401).json({
                success : false,
                message : `please provide valid id `
            })
        }

        // id is valid then find college

        const college = await College.findOne({_id : collegeId})

        // college is present 

        if(!college) {
            return res.status(400).json({
                success : false,
                message : `not found`
            })
        }

        
        // save college in and student info in application schema

        const application = await ApplicationStatus.create({
            studentId ,
            collegeId,
            courseName ,
            status : "Pending"
        })



        if(!application) {
            return res.status(500).json({
                success : false,
                message : `something wrong application not store `
            })
        }

        return res.status(201).json({
            success : true,
            message : `application sended to college`,
            application
        })



        
    } catch (error) {

          return res.status(500).json({
                success : false,
                message : `sever error to apply college ${error}`
            })
        
    }
}

