"use strict";

var User = require("./User");

var Project = require("./Project");

var ProjectImage = require("./ProjectImage");

var ProjectLink = require("./ProjectLink");

var ProjectRole = require("./ProjectRole");

var sequelize = require("../index.js");

var Comment = require("./Comment");

var Featured = require("./Featured");

var fn = function fn() {
  return regeneratorRuntime.async(function fn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(sequelize.sync());

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

fn();
sequelize.authenticate().then(function () {
  console.log("Connection has been established successfully.");
})["catch"](function (err) {
  console.error("Unable to connect to the database:", err);
});
var m = sequelize.models;
m.User.hasMany(Project, {
  onDelete: "CASCADE",
  foreignKey: "userId"
});
m.Project.belongsTo(User, {
  foreignKey: "userId",
  as: "owner"
});
m.User.hasMany(ProjectRole, {
  foreignKey: "userId"
});
m.Project.hasMany(ProjectRole, {
  onDelete: "CASCADE",
  foreignKey: "projectId"
});
m.Project.hasMany(ProjectImage, {
  onDelete: "CASCADE",
  foreignKey: "projectId"
});
m.Project.hasMany(ProjectLink, {
  onDelete: "CASCADE",
  foreignKey: "projectId"
});
m.Project.hasMany(Comment, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "projectId",
    allowNull: true
  }
});
m.Project.belongsToMany(User, {
  through: "Collaborators",
  foreignKey: "projectId",
  as: "collaborators"
});
m.Project.belongsToMany(User, {
  through: "ProjectLikes",
  foreignKey: "projectId",
  as: "likers"
});
m.Project.belongsToMany(User, {
  through: "ProjectDislikes",
  foreignKey: "projectId",
  as: "dislikers"
});
m.User.belongsToMany(Project, {
  through: "Collaborators",
  foreignKey: "userId",
  as: "involvedWith"
});
m.User.belongsToMany(Project, {
  through: "ProjectLikes",
  foreignKey: "userId",
  as: "likedProjects"
});
m.User.belongsToMany(Project, {
  through: "ProjectDislikes",
  foreignKey: "userId",
  as: "dislikedProjects"
});
m.Comment.belongsTo(User, {
  onDelete: "CASCADE",
  foreignKey: "userId"
});
m.Comment.belongsToMany(Comment, {
  through: "CommentReplies",
  foreignKey: "CommentId",
  as: "Replies",
  otherKey: "CommentReplyId"
});
m.Comment.belongsToMany(Comment, {
  through: "CommentReplies",
  foreignKey: "CommentReplyId",
  as: "Parent",
  otherKey: "CommentId"
});
m.User.belongsToMany(Comment, {
  through: "CommentLikes",
  foreignKey: "userId",
  as: "likedComments"
});
m.Comment.belongsToMany(User, {
  through: "CommentLikes",
  foreignKey: "commentId",
  as: "likers"
});
m.User.belongsToMany(User, {
  through: "Followers",
  foreignKey: "followerId",
  as: "followers"
});
m.User.belongsToMany(User, {
  through: "Followings",
  foreignKey: "followingId",
  as: "followings"
});
m.Featured.belongsTo(Project, {
  foreignKey: "projectId"
});
m.User.hasMany("TimelinePost", {
  foreignKey: "userId"
});
module.exports = m;