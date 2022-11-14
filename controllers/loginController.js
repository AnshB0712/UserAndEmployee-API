const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ROLES_LIST = require("../config/roles_list");
const User = require("../models/User");

const handleLogin = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.json({
      status: 403,
      message: "Name and Password both fields are!",
    });
  }

  const targetUser = await User.findOne({ username: name });

  if (!targetUser) {
    return res.json({
      status: 403,
      message: "No user with this name exists!",
    });
  }

  try {
    const match = await bcrypt.compare(password, targetUser.password);

    if (match) {
      const ACCESS_TOKEN = jwt.sign(
        {
          userInfo: {
            userName: targetUser.username,
            roles: Object.values(targetUser.roles),
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );
      const REFRESH_TOKEN = jwt.sign(
        { userName: targetUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", REFRESH_TOKEN, { httpOnly: true });

      await User.findOneAndUpdate(
        { username: name },
        { refreshToken: REFRESH_TOKEN }
      );

      return res.json({ status: 200, token: ACCESS_TOKEN });
    } else {
      return res.json({ status: 200, message: `Password do not match!` });
    }
  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
};

module.exports = handleLogin;
