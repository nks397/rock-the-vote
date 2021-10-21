const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({

    comment: {
        type: String
    },
    // writer: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    // responseTo: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    username: {
        type: String,
        require: true
    },
    issueId: {
        type: Schema.Types.ObjectId,
        ref: "Issue"
    }, 
    // timestamps: true 
})

module.exports = mongoose.model("Comment", commentSchema)