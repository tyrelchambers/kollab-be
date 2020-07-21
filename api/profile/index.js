const express = require('express');
const { authHandler } = require('../../middleware/middleware');
const m = require('../../db/models');

const app = express.Router()

app.get('/', authHandler, async (req, res, next) => {
  try {
    const profile = await m.User.findOne({
      where: {
        uuid: res.locals.userId
      }
    })

    res.send(profile)
  } catch (error) {
    next(error)
  }
})

app.put('/save', authHandler, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      useUsername
    } = req.body;

    await m.User.update({
      firstName,
      lastName,
      username,
      useUsername
    }, {
      where: {
        userId: res.locals.userId
      }
    })

    res.send({
      message: "Profile updated"
    })
  } catch (error) {
    next(error)
  }
})

module.exports = app;