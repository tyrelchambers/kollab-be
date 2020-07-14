const { DataTypes, Deferrable } = require('sequelize')
const sequelize = require('../index')
const Project = require('./Project')

const ProjectRole = sequelize.define("ProjectRole", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false
  },
  filled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  experience: DataTypes.STRING,
  description: DataTypes.TEXT,
  projectId: {
    type: DataTypes.UUID,
    references: {
      model: Project,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  timestamps: true
})

module.exports = ProjectRole