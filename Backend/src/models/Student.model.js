import mongoose from "mongoose";

const studentSchema = new  mongoose.Schema({


 name : {
    type : String,
    require : true ,

 },


 email : {
    type : String,
    require : true,
    unique : true
 },


 password : {
    type : String,
    require : true ,

 },


 role : {

    type : String,
   required : true ,
    enum : ["STUDENT"]

 },

 profilePhoto : {
    type : String , 
    default : "😎"
 },

 contact : {
    type : String, 
    default : null
 },


 castCategory: {
    type : String, 
    default : null
 },


 marks : {
    type : String, 
    default : null
 },

 examCategory : {
    type : String, 
    default : null
 },



}, {timeseries : true})





export const Student = mongoose.model("Student", studentSchema)
 
