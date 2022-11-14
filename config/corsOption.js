const whiteList = [
  "https://www.yoursite.com",
  "http://127:0.0.1:3500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, origin);
    } else {
      callback(new Error("Block By CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
