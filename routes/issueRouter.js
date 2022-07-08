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

// Post
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    req.body.timestamps = req.user.timestamps

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
    req.body.timestamps = req.user.timestamps

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
    const issueId = req.params.issueId
    req.body.username = req.user.username

    Issue.findById({ _id: issueId}, (err, issue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue.comment)
    })
})

// upvote issue
issueRouter.put("/upvotes/:issueId",(req, res, next) => {
    Issue.findByIdAndUpdate({ _id: req.params.issueId },
        { $inc: {upvote: 1 },
            $push: { votedUsers:
                { $each: [req.user._id] }
        }},
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        })
})


// downvote issue
// let downvote = req.body.downvotes
issueRouter.put("/downvotes/:issueId",(req, res, next) => {
    Issue.findByIdAndUpdate({ _id: req.params.issueId },
        { $inc: {downvote: 1 },
            $push: { votedUsers:
                { $each: [req.user._id] }
        }},
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        })
})

module.exports = issueRouter