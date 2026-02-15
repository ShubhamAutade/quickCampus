import  mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config()



const connectDB = async () => {
    try {

        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/quickCampus`)
        console.log(`DB connected successfully`);
        
        
    } catch (error) {

        console.log(`Db not connected error ${error}`);
        process.exit(1)
        
        
    }
}


export default connectDB