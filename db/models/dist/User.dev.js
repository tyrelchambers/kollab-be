"use strict";

var _require = require("sequelize"),
    DataTypes = _require.DataTypes;

var sequelize = require("../index.js");

var User = sequelize.define("User", {
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
  githubAccessToken: DataTypes.STRING,
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
    afterCreate: function afterCreate(user, options) {
      user.username = "".concat(user.firstName, "_").concat(user.lastName).concat(Math.random() * (0 - 999) + 0);
    }
  }
});
module.exports = User;