import jwt, { decode } from "jsonwebtoken"; 
import { User } from "../Models/User.js"; 

export const Authenticated = async (req, res, next) => { 
  const token = req.header("Auth"); // you can switch to Authorization: Bearer <token> later 

  if (!token) return res.status(401).json({ message: "Login First" }); 

    const decoded = jwt.verify(token, "!@#$%^&*()"); 
    let id = decoded.userId 

    let user = await User.findById(id) 

    if(!user) return res.json({message: "User not exists"}) 

        req.user = user 
        next()
}
