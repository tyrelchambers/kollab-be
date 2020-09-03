import { authHandler } from "../../middleware/middleware";

const express = require("express");

const app = express.Router();

app.post("/save", authHandler, async (req, res, next) => {
  try {
    const { body, linkedProject } = req.body;
  } catch (error) {
    next(error);
  }
});

export default app;
