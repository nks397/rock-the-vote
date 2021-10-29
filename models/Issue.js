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
        type: Array,
        ref: "Comment"
    },
    // commentId: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment",
    // }],
    votes: [{
        type: Schema.Types.ObjectId,
        // ref: "User"
    }],
    // downvotes: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Downvote"
    // }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


module.exports = mongoose.model("Issue", issueSchema)