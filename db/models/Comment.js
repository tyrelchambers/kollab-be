import { DataTypes, Deferrable } from 'sequelize'
import sequelize from '../index'
import Project from './Project'
import User from './User'

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