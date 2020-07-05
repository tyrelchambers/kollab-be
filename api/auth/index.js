const express = require('express')
const m = require('../../db/models/index')
const passport = require('passport')

const app = express.Router()

app.post('/register', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

app.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    req.logIn(user, (err) => {
      
      if (err) {
        return next("Something went wrong! Please check your email or password")
      }

      return res.send({
        message: "Logged in succesfully",
        user
      })
    })
  })(req,res,next)
})

module.exports = app