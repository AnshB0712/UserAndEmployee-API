const userDB = require("../data/user.json");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const fsPromises = require("fs").promises;

const handleRegister = async (req, res) => {
  const { name, password, roles } = req.body;

  if (!name || !password)
    return res.json({
      status: 400,
      message: "Name and Password both are mandatory fields.",
    });

  const isUserAlreadyExists = await User.findOne({ username: name }).exec();

  if (isUserAlreadyExists)
    return res.json({
      status: 309,
      message: "User with same name already exists.",
    });

  try {
    const hashPwd = await bcrypt.hash(password, 10);
    const user = { name, hashPwd };

    const result = await User.create({
      username: name,
      password: hashPwd,
      roles,
    });

    res.json({ status: 201, message: `user with name ${name} is created!` });
  } catch (error) {
    res.json({ status: 500, message: "Something went wrong!" });
  }
};

module.exports = handleRegister;
