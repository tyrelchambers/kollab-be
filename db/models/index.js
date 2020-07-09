const Comment = require('./Comment')
const Project = require('./Project')
const ProjectImage = require('./ProjectImage')
const ProjectLink = require('./ProjectLink')
const ProjectRole = require('./ProjectRole')
const User = require('./User')
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
  foreignKey: "projectId"
})

m.User.belongsToMany(Project, {
  through: "Collaborators",
  foreignKey: "userId"
})

module.exports = m
