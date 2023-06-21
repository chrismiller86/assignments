const express = require("express")
const photoRouter = express.Router()
const Photo = require("../models/photo.js")


photoRouter.get("/", (req, res, next) => {
    Photo.find((err, photos) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(photos)
    })
})

photoRouter.get("/user", (req, res, next) => {
    Photo.find({user: req.auth._id}, (err, photos) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(photos)
    })
})

photoRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    const newPhoto = new Photo(req.body)
    newPhoto.save((err, savedPhoto) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedPhoto)
    })
})

photoRouter.delete("/:photoId", (req, res, next) => {
   Photo.findOneAndDelete(
    {_id: req.params.photoId},
    (err, deletedPhoto) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted photo: ${deletedPhoto.title}`)
    }
   ) 
})

photoRouter.put("/:photoId", (req, res, next) => {
    Photo.findOneAndUpdate(
        {_id: req.params.photoId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedPhoto) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPhoto)
        }
    )
})

module.exports = photoRouter