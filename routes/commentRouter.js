const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/Comment.js")

// Get By Issue
// commentRouter.get("/:issueId", (req, res, next) => {
//     Comment.find({"issueId": req.body.issueId})
//     .populate("user")
//     .exec((err, comments) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(comments)
//     })
// })

// Get Comment by Id
commentRouter.get('/:commentId', (req, res, next) => {
    Comment.findById(req.params.commentId, (err, comment) => {
      if (err) {
        res.status(500)
        return next(err)
      } else if (!comment) {
        res.status(404)
        return next(new Error('No comment has been found.'))
      }
      return res.status(200).send(comment)
    })
})


// Get All Comments
commentRouter.get('/', (req, res, next) => {
    Comment.find((err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
  })

// Post
commentRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    // req.body.issueId = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
       if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(savedComment)
    })
})

//Delete Comment
commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findByIdAndDelete(
      { _id: req.params.commentId, user: req.user._id },
      (err, deletedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted comment ${deletedComment}`)
      }
    )
  })
  
  // Update Comment
  commentRouter.put('/:commentId', (req, res, next) => {
    Comment.findByIdAndUpdate(
      { _id: req.params.commentId, user: req.user._id },
      req.body,
      { new: true },
      (err, updatedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedComment)
      }
    )
  })



module.exports = commentRouter