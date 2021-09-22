const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/Comment.js")

// Get
commentRouter.get("/:issueId", (req, res, next) => {
    Comment.find({"issueId": req.body.issueId})
    .populate("user")
    .exec((err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// Post
commentRouter.post("/:issueId", (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    req.body.issueId = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, comment) => {
       if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comment)
    })
})



module.exports = commentRouter