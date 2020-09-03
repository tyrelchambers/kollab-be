"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _middleware = require("../../middleware/middleware");

var express = require("express");

var app = express.Router();
app.post("/save", _middleware.authHandler, function _callee(req, res, next) {
  var _req$body, body, linkedProject;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            _req$body = req.body, body = _req$body.body, linkedProject = _req$body.linkedProject;
          } catch (error) {
            next(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
var _default = app;
exports["default"] = _default;