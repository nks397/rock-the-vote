const mongoose = require("mongoose")
const Schema = mongoose.Schema

const upvoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    issueId: {
        type: Schema.Types.ObjectId,
        ref: "Issue"
    }, 
})


module.exports = mongoose.model("Upvote", upvoteSchema)