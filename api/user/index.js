const express = require('express')
const m = require('../../db/models/index')

const app = express.Router();

app.get('/me', async (req, res, next) => {
  try {
    // const user = await m.User.findOne({})
    console.log(req.session.reload(err => {
      console.log(req.session)
    }))
  } catch (error) {
    next(error)
  }
})

module.exports = app