import express from 'express'
import uploadImage from '../middleware/uploadImage.js'
import { checkAuth, login, register } from '../controllers/auth.js'

const route=express.Router()

route.post('/register',uploadImage,register)
route.post('/login',login)
route.get('/check',checkAuth)


export default route
