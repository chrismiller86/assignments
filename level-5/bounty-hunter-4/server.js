const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/bountydb", () => console.log('connected to database'))

app.use("/bounty", require("./routes/bountyData.js"))


app.use((err, req, res, next) => {
    console.log(err)
    return res.send({ errMsg: err.message })
})


app.listen("8000", () => {
    console.log("The server is running on Port 8000")
})

module.exports = app    
