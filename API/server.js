// mongodb+srv://ashwiniamate81_db_user:8Mnpeu92xlx7cdvd@cluster0.dbgsljm.mongodb.net/

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from "express"

import userRouter from "./Routes/user.js"
import productRouter from "./Routes/product.js"
import cartRouter from "./Routes/cart.js"
import addressRouter from "./Routes/address.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
   
}))

// home route
 
app.get('/', (req, res) => res.json({message: "this is the home route"}))

//user Route
app.use("/api/user", userRouter)

//product Route
app.use("/api/product", productRouter)

//cart Route
app.use("/api/cart", cartRouter)

//address Route 
app.use('/api/address', addressRouter)

mongoose.connect(process.env.MONGO_URL, {
    dbName: "MERN_E_COMMERCE"
}).then(() => console.log("mongodb connected succesfully...!!!")).catch((e) =>{console.log(e)})


app.listen(process.env.PORT, () => {console.log(`server is running on port ${process.env.PORT}`)})


