const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleRefresh = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.sendStatus(400);

  const refreshToken = cookie.jwt;

  const targetUser = await User.findOne({ refreshToken }).exec();

  try {
    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (decode.userName !== targetUser.username)
      throw new Error("Token is tampered!");

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

    return res.json({ token: ACCESS_TOKEN });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = handleRefresh;
