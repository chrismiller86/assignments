const mongoose = require("mongoose")
const Schema = mongoose.Schema

const photoSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    gear: {
        type: String,
        required: false
    },
    imgUrl: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true
    }
})


module.exports = mongoose.model("Photo", photoSchema)