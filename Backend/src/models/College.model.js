import mongoose, { mongo } from "mongoose"

const collegeSchema = new mongoose.Schema({

 
    name : {
        type : String,
        required : true ,

    },


    email : {
        type : String,
        required : true,
        unique : true
    },


    password : {

        type : String ,
        required : true

    },


    role : {
        type : String,
        default : "COLLEGE"
    },

    profilePhoto : {
        type : String,
        default : "🏫"
    },


    courses : {
        type : [String],
        
    },


    city : {
        type : String ,

    },


    contact : {
        type : String,
    },

    Staff :[ {
   
        name : {
              type : String, 
              trim :  true
        },

        mobile: {
            type: Number,
            required: true,
           
        }



    }]



}, {timestamps : true})




export const College = mongoose.model("College",collegeSchema)