const { DataTypes } = require('sequelize')
const sequelize = require('../index')

const GithubLink = sequelize.define("GithubLink", {
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
  }
})

module.exports = GithubLink