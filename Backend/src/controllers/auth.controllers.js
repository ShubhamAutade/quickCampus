import { College } from "../models/College.model.js"
import { Student } from "../models/Student.model.js"
import bcrypt from "bcrypt"
import targetModel from "../utils/modelHelper.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()

// for registration 


const register = async (req , res) =>{
    try {

        // get all data from req.body

       const {name , email , password , role} = req.body


       // validating data 

       if(!name || !email || !password || !role) {

        return res.status(401).json({
            success : false,
            message : `all information required`
        })
       }

       // checking user already exist in college And also student 

       const asStudentExist = await College.findOne({email})

       const asCollegeExist = await Student.findOne({email})

       if(asStudentExist){
        return res.status(401).json({
            success : false,
            message : `this user already exist as a student`
        })
       }
 

          if(asCollegeExist){
        return res.status(401).json({
            success : false,
            message : `this user already exist as a College`
        })
       }


       // if user not exist in both 
       // mack password hash 

       const hashPassword = await bcrypt.hash(password,10)

       // save user into db but remain user role which 
       // get help oh helper  targetModel

         const target = targetModel(role)

         const newUser = await target.create({
            email,
            name,
            role,
            password : hashPassword
         })


       if(!newUser) {
        return res.status(501).json({
            success : false,
            message : `error on creating user`
        })
       } 


       // user created we cant set token in cookie

       // generating jwt payload

       const payload = {
            id : newUser._id,
             email : newUser.email,
             name : newUser.name,
             role : newUser.role,
       }

       const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn : "24h"
       })


       // sending last res

       const option = {
        expires :  new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly : true 
       }

       return res.status(201).cookie("token", token , option).json({
        success : true,
        message : `user creates successfully `,
        newUser
       })



        
    } catch (error) {

        return res.status(500).json({
            success : false,
            message : `server error ${error} for dev in file auth.controllers.js in register`

        })
        
    }
}


export {register}
