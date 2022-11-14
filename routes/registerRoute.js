const express = require("express");
const handleRegister = require("../controllers/registerController");
const registerRouter = express.Router();

registerRouter.route("/").post(handleRegister);

module.exports = registerRouter;
