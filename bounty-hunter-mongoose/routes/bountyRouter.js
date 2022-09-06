const express = require("express");
const bountyRouter = express.Router();
const Bounty = require("../models/bounty");

bountyRouter.get("/", (req, res, next) => {
    Bounty.find((err, items) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(items);
    });
});

bountyRouter.get("/:bountyId", (req, res, next) => {
    Bounty.find({ _id: req.params.bountyId }, (err, bounties) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})

bountyRouter.get("/search/name", (req, res) => {
    Bounty.find({ name: req.query.name }, (err, bounties) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})

bountyRouter.post("/", (req, res, next) => {
    const newBounty = new Bounty(req.body);
    newBounty.save((err, savedBounty) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedBounty);
    });
});

bountyRouter.delete("/:bountyId", (req, res, next) => {
    Bounty.findOneAndDelete({ _id: req.params.bountyId }, (err, bounty) => {
        console.log(`Request body is ${req.body}`);
        if (err) {
            res.status(500);
            return next(err);
        }
        return res
            .status(200)
            .send(`Successfully deleted ${bounty._id} from the database`);
    });
});

bountyRouter.put("/:bountyId", (req, res, next) => {
    Bounty.findOneAndUpdate(
        { _id: req.params.bountyId },
        req.body,
        { new: true },
        (err, updatedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBounty)
        }
    )
})

module.exports = bountyRouter;
