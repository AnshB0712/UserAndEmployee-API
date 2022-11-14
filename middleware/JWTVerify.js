const jwt = require("jsonwebtoken");

const JWTVerifier = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) return res.sendStatus(400);

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decode.userInfo.userName;
    req.roles = decode.userInfo.roles;
    next();
  } catch (error) {
    console.log(error);

    res.sendStatus(400);
  }
};

module.exports = JWTVerifier;
