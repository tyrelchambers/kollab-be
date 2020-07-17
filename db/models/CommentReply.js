const { DataTypes, Deferrable } = require('sequelize')
const sequelize = require('../index')
const CommentParent = require('./CommentParent')
const User = require('./User')

const CommentReply = sequelize.define("CommentReply", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  comment: DataTypes.TEXT,
  commentParentId: {
    type: DataTypes.UUID,
    references: {
      model: CommentParent,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
})

module.exports = CommentReply