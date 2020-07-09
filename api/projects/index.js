const express = require("express");
const m = require("../../db/models");
const { authHandler } = require("../../middleware/middleware");

const app = express.Router();

app.get('/all', async ( req, res, next ) => {
  try {
    const projects = await m.Project.findAll();
    projects.map(x => x.dataValues)

    res.send(projects)
  } catch (error) {
    next(error)
  }
})

app.post("/new", authHandler, async (req, res, next) => {
  try {
    const {
      title,
      headline,
      description,
      likes,
      thumbnail,
      topics,
      openPositions,
      collaborators
    } = req.body;

    const project = await m.Project.create({
      title,
      headline,
      description,
      likes,
      thumbnail,
      topics,
      openPositions,
      userId: res.locals.userId
    }, {
      returning: true
    }).then(res => {
      if (res) return res.dataValues
    })

    const collaboratorsToCreate = collaborators.map(x => ({
      userId: x.uuid,
      projectId: project.uuid
    }))

    m.Collaborators.bulkCreate(collaboratorsToCreate)

    res.send({
      message: "Project created!",
      project
    })
  } catch (error) {
    next(error)
  }
})

app.get('/:projectId/edit', authHandler, async (req, res, next) => {
  try {
    const {
      projectId
    } = req.params;

    const project = await m.Project.findOne({
      where:{
        uuid: projectId
      },
      include: [m.ProjectLink, m.User]
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    res.send(project)
  } catch (error) {
    next(error)
  }
})

app.put('/:projectId/edit', authHandler, async(req, res, next) => {
  try {

    const {
      Users,
      ...rest
    } = req.body;
    
    await m.Project.update({
      rest
    }, {
      where: {
        uuid: rest.uuid
      }
    })

    res.send({
      message: "Project updated!"
    })
  } catch (error) {
    next(error)
  }
})

app.get('/:projectId', async(req, res, next) => {
  try {
    const {
      projectId
    } = req.params;

    const project = await m.Project.findOne({
      where:{
        uuid: projectId
      },
      include: [m.ProjectLink, m.User]
    }).then(res => {
      if (res) {
        return res.dataValues
      }
    })

    res.send(project)
  } catch (error) {
    next(error)
  }
})

module.exports = app;