const express = require("express")
const app = express()
require(dotenv).config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const { expressjwt } = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
    `mongodb://localhost:27017/user-authentication`,
    () => console.log('Connceted to the DB')
)

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
})

app.listen(9000, () => {
    console.log("Server is running on port 9000")
})