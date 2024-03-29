const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")


app.use(express.json())
app.use(morgan('dev'))

mongoose.connect("mongodb://localhost:27017/surfshopdb", () => console.log('connected to database'))


app.use("/items", require("./routes/inventoryRouter.js"))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({ errMsg: err.message })
})

app.listen("8000", () => {
    console.log("The server is running on port 8000")
})

