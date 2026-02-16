import { College } from "../models/College.model.js"
import { Student } from "../models/Student.model.js"
import bcrypt from "bcrypt"
import targetModel from "../utils/modelHelper.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import loginHelper from "../utils/loginHelper.js"


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
            message : `this user already exist as a student please got to login page `
        })
       }
 

          if(asCollegeExist){
        return res.status(401).json({
            success : false,
            message : `this user already exist as a College please go to login page `
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




// for login

const login = async (req, res) =>{

  try {

      // get data

    const {email , password}  = req.body


    // validate data

    if(!email || !password) {
        return res.status(401).json({
            success : false,
            message : `please entre password and email`
        })
    }


    // check user is exist by using loginHelper

     const user = await loginHelper(email)

     if(!user) {
        return res.status(401).json({
            success : false,
            message : `no any type of account`
        })
     }



     // if user is exist then check password is match or not 


     const passwordIsTrue = bcrypt.compare(password , user.password)

     if(!passwordIsTrue) {

        return res.status(401).json({
            success : false ,
            message : `Wrong password`
        })
     }


     // password is correct then generating JWT Token 


     const payload = {
        name : user.name,
        email : user.email,
        id : user._id,
        role : user.role
     }


     const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn : "24h"
     })


     // last response with token

     const option = {
        expiresIn : new Date( Date.now() +  1 * 24 * 60 * 60 * 1000),
        httpOnly : true
     }

     return res.status(201).cookie("token", token , option).json({
        success : true ,
        message : `login successfully`,
        payload
     })




    
  } catch (error) {

    return res.status(501).json({
        success : false ,
        message : `something wrong with sever in auth.controller.js login`
    })
    
  }

}


// logOut
 const logout = async (req , res ) => {

    try {

               
      res.clearCookie("token",{
        httpOnly : true,
        secure : false
      })

      return res.status(200).json({
        success: true,
        message : `logOut Successfully `
      })

        
    } catch (error) {


        console.log(`error in server in file controllers-auth.js-logout mai ERROR = ${error}`);

        res.status(501).json({
            success : false,
            message : `error in server error ${error}`
        })
        
        
    }


}


export {register , login , logout}
