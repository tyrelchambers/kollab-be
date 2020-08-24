"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var m = require('../../db/models/index');

var _require = require('../../middleware/middleware'),
    authHandler = _require.authHandler;

var _require2 = require('sequelize'),
    Op = _require2.Op;

var app = express.Router();
app.get('/me', authHandler, function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(m.User.findOne({
            where: {
              uuid: res.locals.userId
            },
            attributes: {
              exclude: ['password']
            }
          }).then(function (res) {
            if (res) {
              return res.dataValues;
            }
          }));

        case 3:
          user = _context.sent;
          res.send(user);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.put('/me', authHandler, function _callee2(req, res, next) {
  var _req$body, firstName, lastName, username, useUsername, twitter, stackOverflow, instagram, github, gitlab, availableToHelp;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, username = _req$body.username, useUsername = _req$body.useUsername, twitter = _req$body.twitter, stackOverflow = _req$body.stackOverflow, instagram = _req$body.instagram, github = _req$body.github, gitlab = _req$body.gitlab, availableToHelp = _req$body.availableToHelp;
          _context2.next = 4;
          return regeneratorRuntime.awrap(m.User.update({
            firstName: firstName,
            lastName: lastName,
            username: username,
            useUsername: useUsername,
            twitter: twitter,
            stackOverflow: stackOverflow,
            instagram: instagram,
            github: github,
            gitlab: gitlab,
            availableToHelp: availableToHelp
          }, {
            where: {
              uuid: res.locals.userId
            }
          }));

        case 4:
          res.send({
            message: "Profile updated"
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
app.get('/projects', authHandler, function _callee3(req, res, next) {
  var projects;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(m.Project.findAll({
            where: {
              userId: res.locals.userId
            },
            include: ['likers', m.Comment, 'collaborators'],
            order: [['createdAt', 'DESC']]
          }));

        case 3:
          projects = _context3.sent;
          res.send(projects);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get('/all', function _callee4(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(m.User.findAll({
            where: {
              availableToHelp: req.query.availableToHelp
            },
            attributes: {
              exclude: ["password"]
            },
            limit: req.query.limit
          }));

        case 3:
          users = _context4.sent;
          res.send(users);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get('/username/:username', authHandler, function _callee5(req, res, next) {
  var username, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          username = req.params.username;
          _context5.next = 4;
          return regeneratorRuntime.awrap(m.User.findOne({
            where: {
              username: username
            },
            attributes: {
              exclude: ['password']
            }
          }));

        case 4:
          user = _context5.sent;
          res.send(user);
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get('/:email', authHandler, function _callee6(req, res, next) {
  var email, users;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          email = req.params.email;
          _context6.next = 4;
          return regeneratorRuntime.awrap(m.User.findAll({
            where: {
              email: _defineProperty({}, Op.substring, email),
              uuid: _defineProperty({}, Op.not, res.locals.userId)
            },
            attributes: {
              exclude: ['password']
            }
          }));

        case 4:
          users = _context6.sent;
          users.map(function (x) {
            return x.dataValues;
          });
          res.send(users);
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = app;