"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var express = require("express");

var m = require("../../db/models");

var _require = require("../../middleware/middleware"),
    authHandler = _require.authHandler;

var app = express.Router();
app.get("/all", function _callee(req, res, next) {
  var limit, projects, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          limit = Number(req.query.limit) || 25;
          _context.next = 4;
          return regeneratorRuntime.awrap(m.Project.findAll({
            include: ["likers", m.Comment, "collaborators"],
            order: [["createdAt", "DESC"]]
          }));

        case 4:
          projects = _context.sent;
          result = projects.slice(0, limit);
          res.send({
            projects: result,
            limit: limit + 25,
            hasNextPage: projects.length < limit ? false : true
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
app.get('/top', function _callee2(req, res, next) {
  var projects;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(m.Project.findAll({
            order: [["score", "DESC"]],
            limit: 5
          }));

        case 3:
          projects = _context2.sent;
          res.send(projects);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.post("/new", authHandler, function _callee3(req, res, next) {
  var _req$body, title, headline, description, likes, thumbnail, topics, openPositions, collaborators, project, collaboratorsToCreate;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, title = _req$body.title, headline = _req$body.headline, description = _req$body.description, likes = _req$body.likes, thumbnail = _req$body.thumbnail, topics = _req$body.topics, openPositions = _req$body.openPositions, collaborators = _req$body.collaborators;
          _context3.next = 4;
          return regeneratorRuntime.awrap(m.Project.create({
            title: title,
            headline: headline,
            description: description,
            likes: likes,
            thumbnail: thumbnail,
            topics: topics,
            openPositions: openPositions,
            userId: res.locals.userId
          }, {
            returning: true
          }).then(function (res) {
            if (res) return res.dataValues;
          }));

        case 4:
          project = _context3.sent;
          collaboratorsToCreate = collaborators.map(function (x) {
            return {
              userId: x.uuid,
              projectId: project.uuid
            };
          });
          m.Collaborators.bulkCreate(collaboratorsToCreate);
          res.send({
            message: "Project created!",
            project: project
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
app.get("/:projectId/edit", authHandler, function _callee4(req, res, next) {
  var projectId, project;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          projectId = req.params.projectId;
          _context4.next = 4;
          return regeneratorRuntime.awrap(m.Project.findOne({
            where: {
              uuid: projectId
            },
            include: [m.ProjectLink, "owner", m.ProjectRole, "collaborators"]
          }).then(function (res) {
            if (res) {
              return res.dataValues;
            }
          }));

        case 4:
          project = _context4.sent;
          res.send(project);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.put("/:projectId/edit", authHandler, function _callee5(req, res, next) {
  var _req$body2, User, rest;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body2 = req.body, User = _req$body2.User, rest = _objectWithoutProperties(_req$body2, ["User"]);
          _context5.next = 4;
          return regeneratorRuntime.awrap(m.Project.update(_objectSpread({}, rest), {
            where: {
              uuid: rest.uuid
            }
          }));

        case 4:
          res.send({
            message: "Project updated!"
          });
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.put("/:projectId/:approval", authHandler, function _callee6(req, res, next) {
  var _req$params, projectId, approval, likeExists, dislikeExists;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$params = req.params, projectId = _req$params.projectId, approval = _req$params.approval;
          _context6.next = 4;
          return regeneratorRuntime.awrap(m.ProjectLikes.findOne({
            where: {
              userId: res.locals.userId
            }
          }).then(function (res) {
            if (res) {
              return res.dataValues;
            }
          }));

        case 4:
          likeExists = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(m.ProjectDislikes.findOne({
            where: {
              userId: res.locals.userId
            }
          }).then(function (res) {
            if (res) {
              return res.dataValues;
            }
          }));

        case 7:
          dislikeExists = _context6.sent;

          if (!(likeExists && approval === "dislike")) {
            _context6.next = 13;
            break;
          }

          _context6.next = 11;
          return regeneratorRuntime.awrap(m.ProjectLikes.destroy({
            where: {
              projectId: projectId,
              userId: res.locals.userId
            }
          }));

        case 11:
          _context6.next = 13;
          return regeneratorRuntime.awrap(m.ProjectDislikes.create({
            projectId: projectId,
            userId: res.locals.userId
          }));

        case 13:
          if (!(dislikeExists && approval === "like")) {
            _context6.next = 18;
            break;
          }

          _context6.next = 16;
          return regeneratorRuntime.awrap(m.ProjectDislikes.destroy({
            where: {
              projectId: projectId,
              userId: res.locals.userId
            }
          }));

        case 16:
          _context6.next = 18;
          return regeneratorRuntime.awrap(m.ProjectLikes.create({
            projectId: projectId,
            userId: res.locals.userId
          }));

        case 18:
          if (!(!dislikeExists && !likeExists && approval === "like")) {
            _context6.next = 21;
            break;
          }

          _context6.next = 21;
          return regeneratorRuntime.awrap(m.ProjectLikes.create({
            projectId: projectId,
            userId: res.locals.userId
          }));

        case 21:
          if (!(!dislikeExists && !likeExists && approval === "dislike")) {
            _context6.next = 24;
            break;
          }

          _context6.next = 24;
          return regeneratorRuntime.awrap(m.ProjectDislikes.create({
            projectId: projectId,
            userId: res.locals.userId
          }));

        case 24:
          res.sendStatus(200);
          _context6.next = 30;
          break;

        case 27:
          _context6.prev = 27;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 30:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 27]]);
});
app.get("/:projectId", function _callee7(req, res, next) {
  var projectId, project;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          projectId = req.params.projectId;
          _context7.next = 4;
          return regeneratorRuntime.awrap(m.Project.findOne({
            where: {
              uuid: projectId
            },
            include: [m.ProjectLink, "owner", m.ProjectRole, "collaborators", "likers", "dislikers", m.Comment]
          }));

        case 4:
          project = _context7.sent;
          res.send(project.dataValues);
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app["delete"]("/:projectId", authHandler, function _callee8(req, res, next) {
  var projectId;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          projectId = req.params.projectId;
          _context8.next = 4;
          return regeneratorRuntime.awrap(m.Project.destroy({
            where: {
              uuid: projectId
            }
          }));

        case 4:
          res.send({
            message: "Project deleted"
          });
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = app;