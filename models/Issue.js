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
        required: true
    },
    // comment: {
    //     type: Array
    // },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


module.exports = mongoose.model("Issue", issueSchema)