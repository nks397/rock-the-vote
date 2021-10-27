const mongoose = require("mongoose")
const Schema = mongoose.Schema

const downvoteSchema = new Schema({
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


module.exports = mongoose.model("Downvote", downvoteSchema)