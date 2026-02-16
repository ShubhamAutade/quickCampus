import  mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config()



const connectDB = async () => {
    try {

        const connection = await mongoose.connect(`mongodb://localhost:27017/quickCampus`)
        console.log(`DB connected successfully`);
        
        
    } catch (error) {

        console.log(`Db not connected error ${error}`);
        process.exit(1)
        
        
    }
}


export default connectDB