const express = require('express')
const { authHandler } = require('../../middleware/middleware');
const m = require('../../db/models');
const { Op } = require('sequelize');

const app = express.Router()

app.post('/', authHandler, async (req, res, next) => {
  try {
    const {
      projectId,
      collaborators
    } = req.body;

    for(let i = 0; i < collaborators.length; i++) {
      await m.Collaborators.findOrCreate({
        where: {
          projectId,
          userId: collaborators[i].uuid
        }
      })
    }
    
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = app;