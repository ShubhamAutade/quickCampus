

import { Student } from "../models/Student.model.js";
import { College } from "../models/College.model.js";



async function loginHelper(email) {

    let user = null

    user = await Student.findOne({email})

    if(user) return user;

user = await College.findOne({email})

return user


}


export default loginHelper
