const express = require('express')
const m = require('../../db/models')

const app = express.Router()

app.get('/', async (req,res,next) => {
  try {
    const featuredProject = await m.Featured.findOne({
      include:[m.Project]
    })
    res.send(featuredProject)
  } catch (error) {
    next(error)
  }
})

module.exports = app