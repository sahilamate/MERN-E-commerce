
import express from "express"
import { getProfile, login, register, users } from "../Controllers/user.js"
import { Authenticated } from "../Middeleware/auth.js"


const router = express.Router()

// register user
router.post('/register', register)

// login 
router.post("/login", login)

// all users 
router.get("/all", users)

// get profile 
router.get("/profile", Authenticated, getProfile)



export default router