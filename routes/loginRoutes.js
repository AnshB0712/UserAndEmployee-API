const express = require("express");
const handleLogin = require("../controllers/loginController");
const loginRouter = express.Router();

loginRouter.route("/").post(handleLogin);

module.exports = loginRouter;
