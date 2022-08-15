const express = require("express")
const app = express()

app.use(express.json())

app.use("/inventory", require("./routes/inventory.js"))

app.listen("8000", () => {
    console.log("The server is running on Port 8000")
})



module.exports = app