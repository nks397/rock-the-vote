const express = require("express")
const issueRouter = express.Router()
const Issue = require("../models/Issue.js")
const Comment = require("../models/Comment.js")

// Get All
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issues) =>{
      if(err){
        res.status(500)
        return next(err)
    }
        return res.status(200).send(issues)  
    })
    
})

// Get User Issues
issueRouter.get("/user", (req, res, next) => {
    Issue.find({user: req.user._id}, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
    
})

// Get By IssueId
// issueRouter.get('/:issueId', (req, res, next) => {
//     Issue.findById(req.params.issueId, (err, issue) => {
//       if (err) {
//         res.status(500)
//         return next(err)
//       } else if (!issue) {
//         res.status(404)
//         return next(new Error('No post item has been found.'))
//       }
//       return res.send(issue)
//     })
// })

// Post
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// Put
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
       
        {_id: req.params.issueId, user: req.user._id},
        req.body, 
        { new: true }, 
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )  
})

// Delete
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete({_id: req.params.issueId, user: req.user._id}, (err, deleteIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted issue '${deleteIssue}' from the database`)
    })
})

// comment section

// post comment
issueRouter.post("/:issueId/saveComment", (req, res, next) => {
    req.body.user = req.user._id
    const issueId = req.params.issueId
    req.body.username = req.user.username
    const newSavedComment = new Comment(req.body)

    Issue.findById({ _id: issueId}, (err, issue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        issue.comment.push(newSavedComment)
        issue.populate("comment")
        issue.save()
        
        return res.status(200).send(issue)
    })
})

// get all comments for a specific issue
issueRouter.get("/:issueId/getComment", (req, res, next) => {
    // req.body.user = req.user._id
    const issueId = req.params.issueId
    req.body.username = req.user.username

    Issue.findById({ _id: issueId}, (err, issue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        // const commentsByIssueId = issue.comment
        return res.status(200).send(issue.comment)
    })
})

// delete comment
issueRouter.delete('/:issueId/deleteComment', (req, res, next) => {
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
  

// like issue
// issueRouter.put("/:issueId/upvotes",(req, res, next) => {
//     const userId = req.user._id
//     const issueId = req.params.issueId
//     Issue.findLikes(userId, {_id: issueId}, ((err, updatedVote) => {
//         if(!err){
//             !!updatedVote.length
//         }
//         return res.status(201).send(updatedVote)
//     })
// )})

// dislike issue
issueRouter.put("/downvotes/:issueId",(req, res, next) => {
    Issue.findOneAndUpdate({_id: req.params.issueId}, {$inc: {downvotes: 1}}, {new: true}, (err, updatedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedIssue)
    })
})

module.exports = issueRouter