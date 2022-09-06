const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")


app.use(express.json())
app.use(morgan('dev'))


mongoose.connect("mongodb://localhost27017/hitlist", () => console.log("hitlist database is running"))

app.use("/hitlist", require("./routes/bountyRouter.js"))



app.use((err, req, res, next) => {
    return res.send({ errMsg: err.message })
})

app.listen("8000", () => {
    console.log("The server is running on port 8000")
})