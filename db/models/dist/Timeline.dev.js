"use strict";

var _require = require("sequelize"),
    DataTypes = _require.DataTypes,
    Deferrable = _require.Deferrable;

var sequelize = require("../index");

var Project = require("./Project");

var Timeline = sequelize.define("Timeline", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4(),
    primaryKey: true,
    unique: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  linkedProject: {
    type: DataTypes.UUID,
    references: {
      model: Project,
      key: "uuid",
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  timestamps: true
});
module.exports = Timeline;