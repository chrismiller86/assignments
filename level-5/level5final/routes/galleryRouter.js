const express = require("express")
const galleryRouter = express.Router()

galleryRouter.get("/", (req, res, next) => {
    console.log(res)
})


module.exports = galleryRouter

