const express = require("express")
const inventoryRouter = express.Router()
const Item = require("../models/item.js")


inventoryRouter.get("/", (req, res, next) => {
    Item.find((err, items) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

inventoryRouter.get("/:itemId", (req, res, next) => {
    Item.find({ _id: req.params.itemId }, (err, items) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

inventoryRouter.get("/search/name", (req, res) => {
    Item.find({ name: req.query.name }, (err, items) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

inventoryRouter.post("/", (req, res, next) => {
    const newItem = new Item(req.body)
    newItem.save((err, savedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedItem)

    })

})

inventoryRouter.delete("/:itemId", (req, res, next) => {
    Item.findOneAndDelete({ _id: req.params.itemId }, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Succesfully deleted ${deletedItem.name} from the database`)
    })
})

inventoryRouter.put("/:itemId", (req, res, next) => {
    Item.findOneAndUpdate(
        { _id: req.params.itemId },
        req.body,
        { new: true },
        (err, updatedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        }
    )
})


module.exports = inventoryRouter