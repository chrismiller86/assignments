const mongoose = require("mongoose")
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
    },

    imgUrl: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likedBy: [
        {
            type : Schema.Types.ObjectId,
            ref : "User"

        }

    ],
    dislikedBy : [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]



})

module.exports = mongoose.model("Issue", issueSchema)