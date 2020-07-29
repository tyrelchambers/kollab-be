const { DataTypes, Deferrable } = require('sequelize')
const sequelize = require('../index')
const Project = require('./Project')

const Featured = sequelize.define("Featured", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
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

module.exports = Featured