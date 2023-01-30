const dotenv = require("dotenv").config();


module.exports = {
  PORT: process.env.PORT,
  MONGO: process.env.MONGO,
  SALT_ROUNDS: process.env.SALT_ROUNDS,

};
