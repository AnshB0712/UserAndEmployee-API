const express = require("express");
const handleRefresh = require("../controllers/refreshController");
const refreshTokenRouter = express.Router();

refreshTokenRouter.route("/").get(handleRefresh);

module.exports = refreshTokenRouter;
