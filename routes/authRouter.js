const express = require("express")
const authRouter = express.Router()
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")

// Signup
authRouter.post("/signup", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            console.log(user, "user")
            // this status means forbidden
            res.status(403)
            return next(new Error("That username is already taken."))
        }
        // putting req.body inside the parameter is what allows us to get back a user object with the username and password
        const newUser = new User(req.body)
        // console.log(new User(), "new user")
        // console.log(new User(req.body), "new user w/req.body")

        // saves document to database
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // payload, secret
            // savedUser.toObject is in the form of an object.

            // const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            // return res.status(201).send({token, user: savedUser})
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
        })
    })
})

// Login
authRouter.post('/login', (req, res, next) => {
    // first argument is what we are trying to find and the second is a call back function
  
    User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
          res.status(500)
          return next(err)
        }
        if(!user){
          res.status(403)
          return next(new Error("Username or Password are incorrect"))
        }
    
        user.checkPassword(req.body.password, (err, isMatch) => {
          if(err) {
            res.status(403)
            return next(new Error("Username or Password are incorrect"))
          }
          if(!isMatch){
            res.status(403)
            return next(new Error(`Username or Password are incorrect`))
          }
          const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
          return res.status(200).send({ token, user: user.withoutPassword() })
        })
      })
})

module.exports = authRouter