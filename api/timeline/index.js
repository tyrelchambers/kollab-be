const { authHandler } = require("../../middleware/middleware");

const express = require("express");
const TimelinePost = require("../../db/models/TimelinePost");
const m = require("../../db/models");

const app = express.Router();

app.post("/save", authHandler, async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const { text, linkedProject } = req.body;

    await TimelinePost.create({
      body: text,
      userId,
    });

    res.send({
      message: "Post sent",
    });
  } catch (error) {
    next(error);
  }
});

app.get("/", authHandler, async (req, res, next) => {
  try {
    const timeline = await TimelinePost.findAll({
      where: {
        userId: res.locals.userId,
      },
      include: [m.User],
    });

    res.send(timeline);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
