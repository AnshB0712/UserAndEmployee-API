const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.sendStatus(400);

  const refreshToken = cookie.jwt;

  const targetUser = User.findOne({ refreshToken }).exec();

  if (!targetUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  await User.findOneAndUpdate({ username: name }, { refreshToken: "" });

  res.clearCookie("jwt", { httpOnly: true });

  return res.json({
    message: "Logout Successful!!",
  });
};

module.exports = handleLogout;
