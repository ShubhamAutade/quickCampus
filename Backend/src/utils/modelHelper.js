

import { Student } from "../models/Student.model.js";
import { College } from "../models/College.model.js";


function targetModel(role) {

    if(role === "STUDENT") return Student

    return College

}

export default targetModel