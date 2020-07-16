const User = require('./User')
const Comment = require('./Comment')
const Project = require('./Project')
const ProjectImage = require('./ProjectImage')
const ProjectLink = require('./ProjectLink')
const ProjectRole = require('./ProjectRole')
const sequelize = require('../index.js')

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

m.Project.hasMany(Comment, {
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

module.exports = m
