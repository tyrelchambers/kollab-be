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

app.put('/me', authHandler, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      useUsername,
      twitter,
      stackOverflow,
      instagram,
      github,
      gitlab,
      availableToHelp
    } = req.body;

    await m.User.update({
      firstName,
      lastName,
      username,
      useUsername,
      twitter,
      stackOverflow,
      instagram,
      github,
      gitlab,
      availableToHelp
    }, {
      where: {
        uuid: res.locals.userId
      }
    })

    res.send({
      message: "Profile updated"
    })
  } catch (error) {
    next(error)
  }
})

app.get('/projects', authHandler, async (req, res, next) => {
  try {
    const projects = await m.Project.findAll({
      where: {
        userId: res.locals.userId
      },
      include: [
        'likers',
        m.Comment,
        'collaborators'
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });

    res.send(projects)
  } catch (error) {
    next(error)
  }
})

app.get('/all', async (req, res, next) => {
  try {
    const users = await m.User.findAll({
      where: {
        ...req.query
      },
      attributes: {
        exclude: ["password"]
      }
    })

    res.send(users)
  } catch (error) {
    next(error)
  }
})

app.get('/username/:username', authHandler, async (req, res, next) => {
  try {
    const {
      username
    } = req.params

    const user = await m.User.findOne({
      where: {
        username
      },
      attributes: {
        exclude: ['password']
      }
    })

    res.send(user)

  } catch (error) {
    next(error)
  }
})

app.get('/:email', authHandler, async (req, res, next) => {
  try {
    const {
      email
    } = req.params

    const users = await m.User.findAll({
      where: {
        email: {
          [Op.substring]: email
        },
        uuid: {
          [Op.not] : res.locals.userId
        }
      },
      attributes: {
        exclude: ['password']
      }
    })

    users.map(x => x.dataValues)

    res.send(users)

  } catch (error) {
    next(error)
  }
})





module.exports = app