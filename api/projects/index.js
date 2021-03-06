const express = require("express");
const m = require("../../db/models");
const { authHandler } = require("../../middleware/middleware");

const app = express.Router();

app.get("/all", async (req, res, next) => {
  try {
    let limit = Number(req.query.limit) || 24;
    const projects = await m.Project.findAll({
      include: ["likers", m.Comment, "collaborators"],
      order: [["createdAt", "DESC"]],
    });

    const result = projects.slice(0, limit);

    res.send({
      projects: result,
      limit: limit + 24,
      hasNextPage: projects.length < limit ? false : true,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/top", async (req, res, next) => {
  try {
    const projects = await m.Project.findAll({
      order: [["score", "DESC"]],
      limit: 5,
    });

    res.send(projects);
  } catch (error) {
    next(error);
  }
});

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
      collaborators,
    } = req.body;

    const project = await m.Project.create(
      {
        title,
        headline,
        description,
        likes,
        thumbnail,
        topics,
        openPositions,
        userId: res.locals.userId,
      },
      {
        returning: true,
      }
    ).then((res) => {
      if (res) return res.dataValues;
    });

    const collaboratorsToCreate = collaborators.map((x) => ({
      userId: x.uuid,
      projectId: project.uuid,
    }));

    m.Collaborators.bulkCreate(collaboratorsToCreate);

    res.send({
      message: "Project created!",
      project,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/:projectId/edit", authHandler, async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await m.Project.findOne({
      where: {
        uuid: projectId,
      },
      include: [m.ProjectLink, "owner", m.ProjectRole, "collaborators"],
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    res.send(project);
  } catch (error) {
    next(error);
  }
});

app.put("/:projectId/edit", authHandler, async (req, res, next) => {
  try {
    const { User, ...rest } = req.body;

    await m.Project.update(
      {
        ...rest,
      },
      {
        where: {
          uuid: rest.uuid,
        },
      }
    );

    res.send({
      message: "Project updated!",
    });
  } catch (error) {
    next(error);
  }
});

app.put("/:projectId/:approval", authHandler, async (req, res, next) => {
  try {
    const { projectId, approval } = req.params;

    const likeExists = await m.ProjectLikes.findOne({
      where: {
        userId: res.locals.userId,
      },
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    const dislikeExists = await m.ProjectDislikes.findOne({
      where: {
        userId: res.locals.userId,
      },
    }).then((res) => {
      if (res) {
        return res.dataValues;
      }
    });

    if (likeExists && approval === "dislike") {
      await m.ProjectLikes.destroy({
        where: {
          projectId,
          userId: res.locals.userId,
        },
      });

      await m.ProjectDislikes.create({
        projectId,
        userId: res.locals.userId,
      });
    }

    if (dislikeExists && approval === "like") {
      await m.ProjectDislikes.destroy({
        where: {
          projectId,
          userId: res.locals.userId,
        },
      });

      await m.ProjectLikes.create({
        projectId,
        userId: res.locals.userId,
      });
    }

    if (!dislikeExists && !likeExists && approval === "like") {
      await m.ProjectLikes.create({
        projectId,
        userId: res.locals.userId,
      });
    }

    if (!dislikeExists && !likeExists && approval === "dislike") {
      await m.ProjectDislikes.create({
        projectId,
        userId: res.locals.userId,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await m.Project.findOne({
      where: {
        uuid: projectId,
      },
      include: [
        m.ProjectLink,
        "owner",
        m.ProjectRole,
        "collaborators",
        "likers",
        "dislikers",
        m.Comment,
      ],
    });

    res.send(project.dataValues);
  } catch (error) {
    next(error);
  }
});

app.delete("/:projectId", authHandler, async (req, res, next) => {
  try {
    const { projectId } = req.params;

    await m.Project.destroy({
      where: {
        uuid: projectId,
      },
    });

    res.send({
      message: "Project deleted",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = app;
