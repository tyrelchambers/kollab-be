const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../index");
const Project = require("./Project");
const User = require("./User");

const TimelinePost = sequelize.define(
  "TimelinePost",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4(),
      primaryKey: true,
      unique: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    linkedProject: {
      type: DataTypes.UUID,
      references: {
        model: Project,
        key: "uuid",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "uuid",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = TimelinePost;
