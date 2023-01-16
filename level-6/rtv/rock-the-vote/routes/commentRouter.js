const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/comment.js")
const User = require("../models/user.js")

commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})


commentRouter.get("/:issueId", (req, res, next) => {
    Comment.find({ issue: req.params.issueId }, (err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

commentRouter.post("/:issueId", (req, res, next) => {
    req.body.user = req.auth._id
    req.body.issue = req.params.issueId
    const comment = new Comment(req.body)
    comment.save(function (err, newComment) {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newComment)
    })
})

commentRouter.delete(":/issueId", (req, res, next) => {
    Comment.findOneAndDelete(
        { _id: req.params.issueId, user: req.auth._id },
        (err, deletedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted issue:${deletedIssue.description}`)
        }
    )
})


module.exports = commentRouter