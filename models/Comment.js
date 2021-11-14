const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({

    comment: {
        type: String
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    timeStamps: {
        type: Date,
        default: Date.now()
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