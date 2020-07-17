const User = require('./User')
const Project = require('./Project')
const ProjectImage = require('./ProjectImage')
const ProjectLink = require('./ProjectLink')
const ProjectRole = require('./ProjectRole')
const sequelize = require('../index.js')
const CommentParent = require('./CommentParent')
const CommentReply = require('./CommentReply')

const fn = async () => {
  await sequelize.sync()
}

fn();


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const m = sequelize.models

m.User.hasMany(Project, {
  onDelete: "CASCADE",
  foreignKey: "userId"
})

m.Project.belongsTo(User, {
  foreignKey: "userId",
  as: 'owner'
})

m.User.hasMany(ProjectRole, {
  foreignKey: 'userId'
})

m.Project.hasMany(ProjectRole, {
  onDelete: "CASCADE",
  foreignKey: "projectId"
})

m.Project.hasMany(ProjectImage, {
  onDelete: 'CASCADE',
  foreignKey: "projectId"
})

m.Project.hasMany(ProjectLink, {
  onDelete: 'CASCADE',
  foreignKey: "projectId"
})

m.Project.hasMany(CommentParent, {
  onDelete: "CASCADE",
  foreignKey: 'projectId'
})

m.Project.belongsToMany(User, {
  through: "Collaborators",
  foreignKey: "projectId",
  as: 'collaborators'
})

m.Project.belongsToMany(User, {
  through: "ProjectLikes",
  foreignKey: 'projectId',
  as: 'likers'
})

m.Project.belongsToMany(User, {
  through: "ProjectDislikes",
  foreignKey: 'projectId',
  as: 'dislikers'
})

m.User.belongsToMany(Project, {
  through: "Collaborators",
  foreignKey: "userId",
  as: 'involvedWith'
})

m.User.belongsToMany(Project, {
  through: "ProjectLikes",
  foreignKey: "userId",
  as: "likedProjects"
})

m.User.belongsToMany(Project, {
  through: "ProjectDislikes",
  foreignKey: "userId",
  as: "dislikedProjects"
})

m.CommentParent.belongsTo(Project, {
  onDelete: 'CASCADE',
  foreignKey: 'commentParentId'
})

m.CommentParent.hasMany(CommentReply, {
  onDelete: 'CASCADE',
  foreignKey: 'commentParentId'
})

m.CommentParent.belongsTo(User, {
  foreignKey:'userId'
})

m.CommentReply.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = m
