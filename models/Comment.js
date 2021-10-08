const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    username: {
        type: String,
        require: true
    },
    issueId: {
        type: Schema.Types.ObjectId,
        ref: "Issue"
    } 
})

module.exports = mongoose.model("Comment", commentSchema)