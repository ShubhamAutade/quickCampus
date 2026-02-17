
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const isAuth = async (req, res, next) =>  {

    try {

        // get token from req
        const token = req.cookies.token


       // is token present 
        if(!token) {

            return res.status(401).json({
                success : false ,
                message : `please login `
            })
        }


        // decoding token

        const decode = jwt.verify(token , process.env.JWT_SECRET)

        // after decode save token to req.user

        req.user = decode

        next()
        
        
    } catch (error) {

        return res.status(401).json({
            success : false ,
            message : ` invalid token= ${error}`
        })
        
    }


}