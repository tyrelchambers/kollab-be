"use strict";

var _require = require("sequelize"),
    DataTypes = _require.DataTypes,
    Deferrable = _require.Deferrable;

var sequelize = require("../index");

var Project = require("./Project");

var User = require("./User");

var Comment = sequelize.define("Comment", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  comment: DataTypes.TEXT,
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "uuid",
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
  projectId: {
    type: DataTypes.UUID,
    references: {
      model: Project,
      key: "uuid",
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
});
module.exports = Comment;