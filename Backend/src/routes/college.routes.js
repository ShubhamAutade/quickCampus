
import express from "express"
import { home } from "../controllers/college.controllers.js"
import { isAuth } from "../middlewares/isAuth.middlewares.js"
import { isRoleCollege } from "../middlewares/isRoleCollege.middlewares.js"


const router = express.Router()


router.get("/home", isAuth, isRoleCollege, home)


export default router


