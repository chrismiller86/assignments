const mongoose = require("mongoose")
const Schema = mongoose.Schema



const commentSchema = new Schema({
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
    }
})



module.exports = mongoose.model("Comment", commentSchema)