import express from 'express'
import uploadImage from '../middleware/uploadImage.js'
import { login, register } from '../controllers/auth.js'

const route=express.Router()

route.post('/register',uploadImage,register)
route.post('/login',login)


export default route
