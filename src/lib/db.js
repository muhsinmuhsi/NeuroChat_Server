import mongoose from "mongoose";
import { config } from "dotenv";

config();

export async function connectDB(){
 try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected Successfully");
 } catch (error) {
    console.log(error);
 }

}