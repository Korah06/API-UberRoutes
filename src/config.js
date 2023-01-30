const dotenv = require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO: process.env.MONGO,
};
