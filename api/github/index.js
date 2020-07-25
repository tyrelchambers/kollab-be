const express = require('express')
const { default: Axios } = require('axios');
const m = require('../../db/models');
const {authHandler} = require('../../middleware/middleware')
const app = express.Router()

app.get('/', authHandler, async (req, res, next) => {
  try {
    const {
      code,
      state
    } = req.query
    const link = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&state=c7tCRcuvb&state=${state}`

    const { 
      access_token
    } = await Axios.post(link, {}, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.data)

    await m.User.update({
      githubAccessToken: access_token
    }, {
      where: {
        uuid: res.locals.userId
      }
    })

    res.send({
      message: "Authenicated with GitHub",
      accessToken: access_token
    })

  } catch (error) {
    next(error)
  }
})

module.exports = app