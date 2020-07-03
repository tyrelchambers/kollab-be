const { DataTypes, Deferrable } = require('sequelize')
const sequelize = require('../index')
const Project = require('./Project')
const User = require('./User')

const Comment = sequelize.define("Comment", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  message: DataTypes.STRING,
  projectId: {
    type: DataTypes.UUID,
    references: {
      model: Project,
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

module.exports = Comment