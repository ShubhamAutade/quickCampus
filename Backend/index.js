
import app from "./src/app.js"
import connectDB from "./src/db/index.js"

import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8090


connectDB()
.then( () => {
    app.listen(PORT , () => {
        console.log(`app listing on PORT ${PORT}`);
        
    })
} )

.catch(() =>{
    console.log(`mongodb connection failed`);
    
})
