const { DataTypes } = require('sequelize')
const sequelize = require('../index.js')

const User = sequelize.define("User", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  avatar: DataTypes.STRING,
  name: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: DataTypes.STRING,
  twitter: DataTypes.STRING,
  stackOverflow: DataTypes.STRING,
  instagram: DataTypes.STRING,
  github: DataTypes.STRING,
  gitlab: DataTypes.STRING,
  googleSigninToken: DataTypes.STRING,
  profileSetupStage: {
    type: DataTypes.STRING,
    defaultValue: "notStarted"
  },
  availableToHelp: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  timestamps: true,
  hooks: {
    afterCreate: (user, options) => {
      user.username = `${user.firstName}_${user.lastName}${Math.random() * (0 - 999) + 0}`
    }
  }
})

module.exports = User