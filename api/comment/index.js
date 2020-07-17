const express = require('express')
const {authHandler} = require('../../middleware/middleware')
const m = require('../../db/models/index')

const app = express.Router()

app.get('/all', authHandler, async (req, res, next) => {
  try {
    const {
      projectId
    } = req.query;
    console.log(projectId)

    const comments = await m.CommentParent.findAll({
      where:{
        projectId
      },
      include: [{
        model: m.CommentReply,
        include: [m.User]
      }, m.User]
    })

    res.send(comments)
  } catch (error) {
    next(error)
  }
})

app.post('/commentParent', authHandler, async (req, res, next) => {
  try {
    const {
      comment,
      projectId
    } = req.body;

    const commentParent = await m.CommentParent.create({
      comment,
      projectId,
      userId: res.locals.userId
    })

    res.send({
      commentParent,
      message: "Comment posted!"
    })
  } catch (error) {
    next(error)
  }
})

app.post('/commentReply', authHandler, async (req, res, next) => {
  try {
    const {
      parentId,
      comment
    } = req.body;

    const commentReply = await m.CommentReply.create({
      comment,
      commentParentId: parentId,
      userId: res.locals.userId
    })

    res.send({
      comment: commentReply,
      message: "Posted your reply!"
    })
  } catch (error) {
    next(error)
  }
})

module.exports = app;