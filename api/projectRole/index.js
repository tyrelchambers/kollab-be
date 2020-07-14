const express = require('express')
const { authHandler } = require('../../middleware/middleware');
const m = require('../../db/models');

const app = express.Router();

app.post('/', authHandler, async (req,res,next) => {
  try {
    const {
      positions,
      projectId
    } = req.body

    if (positions.length) {
      const positionsToCreate = positions.reduce((result, item) => {
        if (!item.uuid) {
          result.push({ ...item, projectId: projectId })
        }

        return result
      }, [])

      await m.ProjectRole.bulkCreate(positionsToCreate)
    }

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

app.delete('/:roleId', authHandler, async (req, res, next) => {
  try {
    const {
      roleId
    } = req.params;

    await m.ProjectRole.destroy({
      where: {
        uuid: roleId
      }
    })

    res.send({message: 'Role deleted!'})
  } catch (error) {
    next(error)
  }
})
module.exports = app