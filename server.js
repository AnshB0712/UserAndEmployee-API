require("dotenv").config();
const path = require("path");
const express = require("express");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const cookieParser = require("cookie-parser");

const mainRouter = require("./routes/mainRoutes");
const nameRouter = require("./routes/nameRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const registerRouter = require("./routes/registerRoute");
const loginRouter = require("./routes/loginRoutes");
const refreshTokenRouter = require("./routes/refreshTokenRoute");
const logoutRouter = require("./routes/logoutRoute");
const JWTVerifier = require("./middleware/JWTVerify");
const corsOptions = require("./config/corsOption");
const connectDB = require("./config/dbConnect");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(require("cors")(corsOptions));

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", mainRouter);
app.use("/name", nameRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/logout", logoutRouter);

app.use(JWTVerifier);
app.use("/employees", employeeRouter);

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      error: "not found",
      code: 404,
    });
  } else {
    res.send("404 Not Found");
  }
});

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`app is listening at ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
