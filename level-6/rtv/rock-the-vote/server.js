const express = require("express")
const app = express()
require('dotenv').config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const { expressjwt: jwt } = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
    process.env.MONGODB_URL,
    () => console.log('Connceted to the DB')
)

app.use('/auth', require("./routes/authRouter.js"))
app.use('/api', jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/issue', require("./routes/issueRouter.js"))
app.use('/api/comments', require("./routes/commentRouter.js"))

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.listen(9000, () => {
    console.log("Server is running on port 9000")
})