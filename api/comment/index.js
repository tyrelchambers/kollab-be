const express = require('express')
const {authHandler} = require('../../middleware/middleware')
const m = require('../../db/models/index')

const app = express.Router()

app.get('/all', authHandler, async (req, res, next) => {
  try {
    const {
      projectId
    } = req.query;

    const comments = await m.Comment.findAll({
      where:{
        projectId
      },
      order: [
        ['Replies', 'createdAt','DESC']
      ],
      include: [{
        model: m.Comment,
        as: 'Replies',
        include: [m.User, 'likers']
      }, m.User, 'likers']
    })


    res.send(comments)
  } catch (error) {
    next(error)
  }
})

app.post('/new', authHandler, async (req, res, next) => {
  try {
    const {
      comment,
      projectId,
      parentId
    } = req.body

    const newComment = await m.Comment.create({
      userId: res.locals.userId,
      comment,
      projectId
    })

    if (parentId) {
      await m.CommentReplies.create({
        CommentId: parentId,
        CommentReplyId: newComment.uuid
      })
    }


    res.send({
      message: "Posted your reply!"
    })
  } catch (error) {
    next(error)
  }
})

app.put('/:commentId/like', authHandler, async (req, res, next) => {
  try {
    const {
      commentId
    } = req.params;

    await m.CommentLikes.create({
      userId: res.locals.userId,
      commentId
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

app.delete('/:commentId/dislike', authHandler, async (req, res, next) => {
  try {
    const {
      commentId
    } = req.params;

    await m.CommentLikes.destroy({
      where: {
        commentId,
        userId: res.locals.userId
      }
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

app.delete('/:commentId', authHandler, async (req, res, next) => {
  try {
    const {
      commentId
    } = req.params;

    await m.Comment.destroy({
      where: {
        uuid: commentId,
        userId: res.locals.userId
      }
    })

    res.send({
      message: "Comment deleted!"
    })
  } catch (error) {
    next(error)
  }
})
module.exports = app;