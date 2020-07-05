const express = require('express')
const m = require('../../db/models/index');
const { authHandler } = require('../../middleware/middleware');

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

module.exports = app