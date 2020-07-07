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
      openPositions
    } = req.body;

    console.log(req.body)
  } catch (error) {
    next(error)
  }
})

module.exports = app;