const express = require("express");
const m = require("../../db/models");

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

module.exports = app;