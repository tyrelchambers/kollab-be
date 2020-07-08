const express = require('express')
const m = require('../../db/models')
const bcrypt = require('bcryptjs')
const app = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../../config')

app.post('/register', async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    if ( !email || !password ) throw new Error("No email or password provided");

    const existingUser = await m.User.findOne({
      where:{ 
        email
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    if (existingUser) throw new Error("User already exists");

    const user = await m.User.create({
      email,
      password: bcrypt.hashSync(password, 10)
    })

    const token = jwt.sign({uuid: user.uuid, email: user.email}, config.development.secret, {
      expiresIn: "1d"
    });
    
    res.send({
      token,
      user,
      message: "Account created!"
    })
  } catch (error) {
    next(error)
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body

    const user = await m.User.findOne({
      where: {
        email
      }
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    });

    if (!user) throw new Error("No user exists with that email")

    // const hashPassword = bcrypt.compareSync(password, user.password)
    // if (!hashPassword) throw new Error("Something went wrong. Maybe it's your email or password?");

    const token = jwt.sign({uuid: user.uuid, email: user.email}, config.development.secret, {
      expiresIn: "1d"
    });


    res.send({
      user,
      token,
      message: "Logged in successfully!"
    })

  } catch (error) {
    next(error)
  }
})

module.exports = app