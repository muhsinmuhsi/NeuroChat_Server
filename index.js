import express from 'express'
import mongoose from 'mongoose'
const PORT=5000
import dotenv from 'dotenv'
const app=express()

dotenv.config()

async function connectDB(){
 try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected Successfully");
 } catch (error) {
    console.log(error);
 }

}
connectDB()

app.use((req,res)=>{
  res.send('welcome to our server')
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})