const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bountySchema = new Schema({
    name: {
        type: String,
        required: true

    },
    living: {
        type: Boolean,
        required: true

    },
    affiliation: {
        type: String,
        required: true
    },
    bounty: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Bounty", bountySchema)