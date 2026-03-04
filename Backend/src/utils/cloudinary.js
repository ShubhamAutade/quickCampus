import {v2 as cloudinary} from "cloudinary"

import fs from  "fs"


cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
        api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
    });


    const uploadOnCloudinary = async (localFilePath) => {
        try {

            // check localFilePath is here 

            if (!localFilePath) return null 

            // upload the file on cloudinary 

            const response = await cloudinary.uploader.upload(localFilePath , {
                resource_type : "image"
            })


            // file has been uploaded successfully 

            console.log("files is uploaded on cloudinary" , response.url);


            if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)
            
             
            return response

            
        } catch (error) {

            // unlink localFilePath local saved temporary file path as upload operation failed


         if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)
        return null
            
        }
    } 


    export {uploadOnCloudinary}