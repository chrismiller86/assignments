const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bountySchema = new Schema({
    firstName: String,
    lastName: String,
    isLiving: Boolean,
    bounty: Number,
    type: String


})

module.exports = mongoose.model("Bounty", bountySchema)