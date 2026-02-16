import mongoose from "mongoose"


const applicationStatusSchema = new mongoose.Schema( {

 
    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true 

    },


    collegeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "College",
         required : true 
    },

    courseName: {
        type: String,
        required: true,
    },


    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending" 
    }


}, {timestamps : true })


export const ApplicationStatus = mongoose.model("ApplicationStatus", applicationStatusSchema)