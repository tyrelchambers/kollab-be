"use strict";

var express = require('express');

var _require = require('../../middleware/middleware'),
    authHandler = _require.authHandler;

var m = require('../../db/models');

var _require2 = require('sequelize'),
    Op = _require2.Op;

var app = express.Router();
app.post('/', authHandler, function _callee(req, res, next) {
  var _req$body, projectId, collaborators, i;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, projectId = _req$body.projectId, collaborators = _req$body.collaborators;
          i = 0;

        case 3:
          if (!(i < collaborators.length)) {
            _context.next = 9;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(m.Collaborators.findOrCreate({
            where: {
              projectId: projectId,
              userId: collaborators[i].uuid
            }
          }));

        case 6:
          i++;
          _context.next = 3;
          break;

        case 9:
          res.sendStatus(200);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
app.delete('/', authHandler, function _callee2(req, res, next) {
  var _req$query, projectId, userId;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, projectId = _req$query.projectId, userId = _req$query.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(m.Collaborators.destroy({
            where: {
              projectId: projectId,
              userId: userId
            }
          }));

        case 4:
          res.send({
            message: "Collaborator removed"
          });
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
module.exports = app;