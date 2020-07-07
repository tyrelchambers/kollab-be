const express = require('express')
const m = require('../../db/models/index');
const { authHandler } = require('../../middleware/middleware');
const { Op } = require('sequelize');

const app = express.Router();

app.get('/me', authHandler , async (req, res, next) => {
  try {
    const user = await m.User.findOne({
      where: {
        uuid: res.locals.userId
      },
      attributes: {
        exclude: ['password']
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    res.send(user)
  } catch (error) {
    next(error)
  }
})

app.get('/projects', authHandler, async (req, res, next) => {
  try {
    const projects = await m.Project.findAll({
      where: {
        userId: res.locals.userId
      }
    });

    projects.map(x => x.dataValues)

    res.send(projects)
  } catch (error) {
    next(error)
  }
})

app.get('/:email', async (req, res, next) => {
  try {
    const {
      email
    } = req.params

    const users = await m.User.findAll({
      where: {
        email: {
          [Op.substring]: email
        }
      }
    })

    users.map(x => x.dataValues)

    res.send(users)

  } catch (error) {
    next(error)
  }
})



module.exports = app