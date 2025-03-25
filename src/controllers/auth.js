import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import dotenv from 'dotenv'


dotenv.config()


export const register=async (req,res,next)=>{
    const {username,email,password}=req.body;

    
    try {
         const isUserExist = await User.findOne({email:email})

         if(isUserExist){
            return res.status(400).json({status: "error",message: "email already taken!"})
         }

         const hashedPassword = await bcryptjs.hash(password,10)

         const newUser=new User({
            username:username,
            image:req.cloudinaryImageUrl,
            email:email,
           password:hashedPassword
         }) 

         await newUser.save()

         return res.status(201).json({ status: "success",message: "User registered successfully",
            data:newUser
          })
    
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
}



export const login = async (req,res,next)=>{
    
   const {email,password}=req.body
    
    
try {
    const isUserValid =await User.findOne({email})

     if(!isUserValid){
        return res.status(404).json({error:'user not found'})
     }
    
     const validPass = bcryptjs.compareSync(password,isUserValid.password)
     
     if(!validPass){
        return res.status(404).json({error:'wrong credential'})
     }
     
    //jwt setting
     const token = jwt.sign({id:isUserValid._id},process.env.JWT_SECRET)
     const {password:hashedPassword,...data }=isUserValid._doc;
     const expiryDate= new Date(Date.now()+60*1000); 
   
     //cookie setting

     res.cookie("access_token",token,{httpOnly:true,expire:expiryDate})
     .status(200).json({message:'user login success fully',user:data,token})
  }catch(error){
    res.status(500).json({error:'internal server error'})
    next(error)
  }
}
