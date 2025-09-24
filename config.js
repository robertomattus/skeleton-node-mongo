require("dotenv").config();

const configs = {
  api: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "http://localhost:3000",
    nodeEnv: process.env.NODE_ENV || "development",
    secretOrKey: process.env.JWT_SECRET,
  },
  db: {
    development: {
      uri: process.env.MONGO_URI,
    },
    production: {
      uri: process.env.MONGO_URI,
    },
    testing: {
      uri: process.env.MONGO_URI,
    },
  },
};

module.exports = configs;
