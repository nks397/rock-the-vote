const express = require("express")
const issueRouter = express.Router()
const Issue = require("../models/Issue.js")

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

// Get By IssueId
issueRouter.get('/:issueId', (req, res, next) => {
    Issue.findById(req.params.issueId, (err, issue) => {
      if (err) {
        res.status(500)
        return next(err)
      } else if (!issue) {
        res.status(404)
        return next(new Error('No post item has been found.'))
      }
      return res.send(issue)
    })
  })

// Get By User
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
    Issue.findOneAndDelete({_id: req.params.issueId, user: req.user._id}, (err) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Issue successfully deleted`)
    })
})

// like issue
issueRouter.put("/upvotes/:issueId",(req, res, next) => {
    Issue.findOneAndUpdate({_id: req.params.issueId}, {$inc: {upvotes: 1}}, {new: true}, (err, updatedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedIssue)
    })
})

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