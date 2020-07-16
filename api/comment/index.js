const express = require('express')
const {authHandler} = require('../../middleware/middleware')

const app = express.Router()

app.post('/', authHandler, async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

module.exports = app;