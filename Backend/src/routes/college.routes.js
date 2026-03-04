
import express from "express"
import { application, filter, home, profile, setFilter, updateProfile, updateStatus } from "../controllers/college.controllers.js"
import { isAuth } from "../middlewares/isAuth.middlewares.js"
import { isRoleCollege } from "../middlewares/isRoleCollege.middlewares.js"
import { collegeProfileCompleted } from "../middlewares/collegeProfileIsCompleted.middleware.js"
import { getCollegeFilter } from "../middlewares/getCollegeFilter.middlwares.js"
import multer from "multer"
import { upload } from "../middlewares/multer.middlewares.js"



const router = express.Router()


router.get("/home", isAuth, isRoleCollege, collegeProfileCompleted ,getCollegeFilter, home)


router.get("/home/profile" , isAuth , isRoleCollege,  profile)


router.patch("/home/profile/update", isAuth , isRoleCollege ,upload.single("profilePhoto") ,  updateProfile)

router.get("/home/application/:applicationId", isAuth, isRoleCollege ,application)

router.post("/home/application/:applicationId/update-status", isAuth , isRoleCollege, updateStatus)

router.get("/home/filter", isAuth , isRoleCollege , getCollegeFilter , filter)

router.post("/home/filter/setfilter", isAuth , isRoleCollege, setFilter)


export default router


