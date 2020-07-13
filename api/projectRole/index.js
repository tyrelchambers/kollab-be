const express = require('express')
const { authHandler } = require('../../middleware/middleware')

const app = express.Router;

app.post('/', authHandler, async (req,res,next) => {
  try {
    const {
      positions,
      projectId
    } = req.body

    const positionsToCreate = positions.reduce((result, item )=> {
      if (!item.uuid) {
        result.push({...item, projectId: projectId})
      }

      return result
    }, [])

   await m.Collaborators.bulkCreate(positionsToCreate)

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = app