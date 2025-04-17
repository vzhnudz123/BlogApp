import mongoose from "mongoose";
import 'dotenv/config'

const DB_url=process.env.url

export async function connectdb() {
    try{
        await mongoose.connect(DB_url)
        console.log("mongodb connected");
        

    }
    catch(error){
        console.log(error.message);
        

    }

    
}