const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const LikeSchema = mongoose.Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: "User"
    }, 
    issue : {
        type: Schema.Types.ObjectId,
        ref: "Issue"
    }
})

const like = mongoose.model('like', LikeSchema)