const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")

// middleware
app.use(express.json())
app.use(morgan("dev"))

// mongoose connect
mongoose.connect(
    "mongodb+srv://localhost:5000@cluster0.tvlbm.mongodb.net/rock-the-vote-db?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      () => console.log('Connected to the DB')
)


// routes
app.use("/auth", require('./routes/authRouter.js'))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use("/api/issue", require("./routes/issueRouter.js"))
// app.use("/api/comment", require("./routes/commentRouter.js"))
app.use('/api/issue/:issueId/comments', require('./routes/commentRouter.js'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

// port
app.listen(5000, ()=> {
    console.log("Sever is running on local port 5000.")
})