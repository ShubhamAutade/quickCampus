import express from "express"
import { isAuth } from "../middlewares/isAuth.middlewares.js"
import { isRoleStudent } from "../middlewares/isRoleStudent.middlewares.js"
import { applicationStatus, apply, filter, home, oneCollege, profile, setFilter, updateProfile } from "../controllers/student.controllers.js"

import { getStudentFilter } from "../middlewares/getStudentFilter.middlewaress.js"
const router = express.Router()

router.get("/home", isAuth , isRoleStudent , home)

router.get("/home/:id", isAuth , isRoleStudent, oneCollege)

router.get("/home/user/profile", isAuth, isRoleStudent, profile)

router.patch("/home/user/profile/update", isAuth, isRoleStudent, updateProfile)

router.post("/home/:id/apply", isAuth , isRoleStudent, apply)

router.get("/home/user/applications", isAuth , isRoleStudent , applicationStatus)

router.get("/home/getfilter/filter", isAuth , isRoleStudent ,getStudentFilter, filter )

router.post("/home/setfilter/filter", isAuth , isRoleStudent , setFilter )



export default router