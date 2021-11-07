const mongoose = require("mongoose")
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    username: {
        type: String,
    },
    comment: {
        type: Array
    },
    // upvotes: [],
    // downvotes: [],
   
    upvote: {
        type: Number,
        default: 0,
    },
    downvote: {
        type: Number,
        default: 0
    },
    votedUsers: [{
        type: String
    }],
    // voters: [],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Issue", issueSchema)