import mongoose from "mongoose";

const studentSchema = new  mongoose.Schema({


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
    type : String,
    required : true ,

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



}, {timestamps : true})





export const Student = mongoose.model("Student", studentSchema)
 
