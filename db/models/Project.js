const { DataTypes, Deferrable } = require('sequelize')
const sequelize = require('../index')
const User = require('./User')

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
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://arcanumdeepsecrets.files.wordpress.com/2010/06/blast_500x500.jpg'
  },
  topics: DataTypes.STRING,
  openPositions: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
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