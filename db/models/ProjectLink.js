const { DataTypes, Deferrable } = require('sequelize')
const sequelize = require('../index')
const Project = require('./Project')

const ProjectLink = sequelize.define("ProjectLink", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  link: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  projectId: {
    type: DataTypes.UUID,
    references: {
      model: Project,
      key: 'uuid',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
})

module.exports = ProjectLink