const express = require("express")
const bountyDataRouter = express.Router()
const Bounty = require("../models/bounty.js")


// Get
bountyDataRouter.get("/", (req, res, next) => {
    Bounty.find((err, bounties) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})

//Get 1
bountyDataRouter.get("/:bountyId", (req, res, next) => {
    Bounty.find({ _id: req.params.bountyId }, (err, bounties) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})

//Post
bountyDataRouter.post("/", (req, res, next) => {
    const newBounty = new Bounty(req.body)
    newBounty.save((err, savedBounty) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedBounty)
    })
})


//Put 
bountyDataRouter.put("/:bountyId", (req, res, next) => {
    Bounty.findOneAndUpdate(
        { _id: req.params.bountyId },
        req.body,
        { new: true },
        (err, updatedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedBounty)
        }
    )
})

//Delete
bountyDataRouter.delete("/:bountyId", (req, res, next) => {
    Bounty.findOneAndDelete({ _id: req.params.bountyId }, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem._id} from the database. `)
    })
})




module.exports = bountyDataRouter