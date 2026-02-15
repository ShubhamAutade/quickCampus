import express from "express"


const app = express()

app.get("/test", (req, res) => {
    return res.send("all good")
})


export default app
