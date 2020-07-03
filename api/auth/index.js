import express from 'express'
import m from '../../db/models/index'

const app = express.Router()

app.post('/register', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const email = req.sanitize(req.body.email);
    const password = req.sanitize(req.body.password)
    const rememberMe = req.body.rememberMe;
    
    const user = await m.User.findOne({
      where: {
        email: email,
        password: password
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    console.log(rememberMe)

    res.send({
      user: user,
      cookie: rememberMe === true ? {
        ...req.session.cookie,
        sid: req.sessionID
      } : null
    })
  } catch (error) {
    next(error)
  }
})

module.exports = app