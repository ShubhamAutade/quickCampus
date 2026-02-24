
import express from "express"
import { home } from "../controllers/college.controllers.js"
import { isAuth } from "../middlewares/isAuth.middlewares.js"
import { isRoleCollege } from "../middlewares/isRoleCollege.middlewares.js"
import { collegeProfileCompleted } from "../middlewares/collegeProfileIsCompleted.middleware.js"


const router = express.Router()


router.get("/home", isAuth, isRoleCollege, collegeProfileCompleted , home)


export default router


