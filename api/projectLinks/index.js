const express = require('express');
const { authHandler } = require('../../middleware/middleware');
const m = require('../../db/models');

const app = express.Router();

app.post('/new', authHandler, async (req, res, next) => {
  try {
    const {
      projectLinks,
      projectId
    } = req.body;

    const linksToCreate = projectLinks.map(x => {
      if (!x.uuid) {
        return {
          projectId,
          link: x.link
        }
      }
    })
    console.log(linksToCreate)
   // await m.ProjectLink.bulkCreate(linksToCreate)

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = app;