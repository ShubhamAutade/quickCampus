import express from "express"
import { isAuth } from "../middlewares/isAuth.middlewares.js"
import { isRoleStudent } from "../middlewares/isRoleStudent.middlewares.js"
import { home, oneCollege } from "../controllers/student.controllers.js"

const router = express.Router()

router.get("/home", isAuth , isRoleStudent , home)

router.get("/home/:id", isAuth , isRoleStudent, oneCollege)


export default router