const express = require("express")
const app = express()
require('dotenv').config()
const morgan = require ("morgan")
const mongoose = require("mongoose")
const {expressjwt: jwt} = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

// mongoose.connect("mongodb://localhost:27017/userdb", 
// console.log("Connected to DB"))

mongoose.connect("mongodb+srv://chrismillercr:Lttsfanh123!@cluster0.yprce0i.mongodb.net/test", () => console.log('Connected to DB'))

// mongoose.connect(
//     'mongodb://localhost:27017/user-authentication',
//     console.log("Connected to the DB")
// )

app.use('/auth', require("./routes/authRouter.js"))
app.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/photo', require("./routes/photoRouter.js"))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("Server is running on port 9000")
})