import express from 'express'
import user_auth from './src/routes/auth_route.js'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import {createServer} from 'http'
import { connectDB } from './src/lib/db.js'

const app=express()
const PORT=5000
dotenv.config()
const server=createServer(app)

const corsOptions = {
   origin: 'http://localhost:5173', 
   credentials: true, 
 };

 const io= new Server(server,{
   cors:{origin:process.env.CLIENT_URL, methods: ['GET', 'POST']},
 });

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users',user_auth)

const users = {};


io.on('connection',(socket)=>{
   console.log('user connected:', socket.id);

   socket.on('user_online',(userId)=>{
      users[userId]=socket.id;
   })

   socket.on('send_message',({sender, receiver, content})=>{
      if(users[receiver]) io.to(users[receiver]).emit('receive_message', {sender,content});
   })

   socket.on('disconnect',()=>{
      console.log('user disconnected:',socket.id);
   })
})

connectDB();



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})