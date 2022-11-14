const express = require("express");
const data = require("../data/data.json");
const path = require("path");
const nameRouter = express.Router();

nameRouter
  .route("/")
  .get((req, res) => {
    res.json(data);
  })
  .post((req, res) => {
    console.log(req);
    res.json(req.body);
  });

module.exports = nameRouter;
