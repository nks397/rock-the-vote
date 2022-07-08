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
      process.env.MONGO_URL,
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