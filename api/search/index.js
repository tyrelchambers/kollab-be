const express = require('express');
const m = require('../../db/models');
const {Op} = require('sequelize')
const app = express.Router();

app.use('/:query', async (req, res, next) => {
  try {
    const {
      query
    } = req.params;

    const users = await m.User.findAll({
      where: {
        username: {
          [Op.iLike]: `%${query}%`
        }
      }
    })

    const projects = await m.Project.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`
        }
      }
    })

    res.send({
      users,
      projects
    })
  } catch (error) {
    next(error)
  }
})

module.exports = app;