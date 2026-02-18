import express from "express"
import { isAuth } from "../middlewares/isAuth.middlewares.js"
import { isRoleStudent } from "../middlewares/isRoleStudent.middlewares.js"
import { applicationStatus, apply, home, oneCollege, profile, updateProfile } from "../controllers/student.controllers.js"

const router = express.Router()

router.get("/home", isAuth , isRoleStudent , home)

router.get("/home/:id", isAuth , isRoleStudent, oneCollege)

router.get("/home/user/profile", isAuth, isRoleStudent, profile)

router.patch("/home/user/profile/update", isAuth, isRoleStudent, updateProfile)

router.post("/home/:id/apply", isAuth , isRoleStudent, apply)

router.get("/home/user/applications", isAuth , isRoleStudent , applicationStatus)



export default router