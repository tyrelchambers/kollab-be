import Comment from './Comment'
import GithubLink from './GithubLink'
import Project from './Project'
import ProjectImage from './ProjectImage'
import ProjectLink from './ProjectLink'
import ProjectRole from './ProjectRole'
import User from './User'
import sequelize from '../index.js'

(async() => {
  sequelize.sync({ force: true })
})()

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

m.User.hasMany(GithubLink, {
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

module.exports = m
