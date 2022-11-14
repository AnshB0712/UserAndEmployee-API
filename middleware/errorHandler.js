const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}`, "errorLog.txt");
  console.log(err);
  next();
};

module.exports = errorHandler;
