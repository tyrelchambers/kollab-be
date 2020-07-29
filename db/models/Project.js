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
  thumbnailUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://arcanumdeepsecrets.files.wordpress.com/2010/06/blast_500x500.jpg'
  },
  topics: DataTypes.STRING,
  openPositions: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  score: {
    type: DataTypes.FLOAT(4,2),
    defaultValue: 0
  },
  deprecatedScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue:0
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  wasFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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