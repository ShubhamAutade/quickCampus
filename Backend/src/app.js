import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.routes.js"



const app = express()

app.use(cookieParser());

const corsOptions = {

    origin : 'http://localhost:5173',
    methods : ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credential : true

}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/test", (req, res) => {
    return res.status(201).json({
        success : true ,
        message : `test done all working`
    })
})



app.use("/api/v1/auth",authRouter)



export default app
