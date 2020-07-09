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
      githubLinks,
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
    })

    const githubLinksToCreate = githubLinks.map(x => ({
      projectId: project.uuid,
      link: x
    }))

    m.GithubLink.bulkCreate(githubLinksToCreate)

    const collaboratorsToCreate = collaborators.map(x => ({
      userId: x.uuid,
      projectId: project.uuid
    }))

    m.Collaborators.bulkCreate(collaboratorsToCreate)

    res.send({message: "Project created!"})
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
      include: [m.GithubLink, m.User]
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
      githubLinks,
      Users,
      ...rest
    } = req.body;
    
    await m.Project.update({
      rest
    }, {
      where: {
        uuid: rest.uuid
      }
    });

    const githubLinksToCreate = githubLinks.map(x => ({
      projectId: rest.uuid,
      link: x
    }))
    console.log(githubLinksToCreate)

    await m.GithubLink.bulkCreate(githubLinksToCreate)

    res.send({
      message: "Project updated!"
    })
  } catch (error) {
    next(error)
  }
})

module.exports = app;