import { DataTypes, Deferrable } from 'sequelize'
import sequelize from '../index'
import User from './User'

const Project = sequelize.define("Project", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    required: true
  },
  headline: {
    type: DataTypes.STRING
  },
  description: {
    required: true,
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [50, 500]
    }
  },
  thumbnailUrl: DataTypes.STRING,
  topics: DataTypes.STRING,
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }

}, {
  timestamps: true
})

module.exports = Project