const express = require('express');
const { authHandler } = require('../../middleware/middleware');
const m = require('../../db/models');

const app = express.Router();

app.post('/', authHandler, async (req, res, next) => {
  try {
    const {
      projectLinks,
      projectId
    } = req.body;

    const linksToCreate = projectLinks.reduce((result, item )=> {
      if (!item.uuid) {
        result.push({link: item.link, projectId: projectId})
      }

      return result
    }, [])

   await m.ProjectLink.bulkCreate(linksToCreate)

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

app.delete('/:linkId', authHandler, async (req,res,next) => {
  try {
    const { 
      linkId
    } = req.params;

    await m.ProjectLink.destroy({
      where: {
        uuid: linkId
      }
    })

    res.send({message: "Link removed!"})

  } catch (error) {
    next(error)
  }
})

module.exports = app;