const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/Comment.js")

// Post
commentRouter.post("/:issueId", (req, res, next) => {
    req.body.userId = req.user._id
    req.body.username = req.user.username
    req.body.issueId = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, comment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        Comment.find({"_id": comment._id})
        .populate("user")
        .exec((err, result) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(result)
        }) 
    })
    
})

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

module.exports = commentRouter