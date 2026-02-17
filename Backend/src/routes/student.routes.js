import express from "express"
import { isAuth } from "../middlewares/isAuth.middlewares.js"
import { isRoleStudent } from "../middlewares/isRoleStudent.middlewares.js"
import { home } from "../controllers/student.controllers.js"

const router = express.Router()

router.get("/home", isAuth , isRoleStudent , home)


export default router