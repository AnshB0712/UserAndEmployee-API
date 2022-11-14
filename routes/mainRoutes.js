const express = require("express");
const mainRouter = express.Router();
const path = require("path");

mainRouter.get("/", (req, res) => {
  console.log("jo");
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

mainRouter.get(
  "/new",
  (req, res, next) => {
    console.log("middleware");
    next();
  },
  (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
  }
);

module.exports = mainRouter;
