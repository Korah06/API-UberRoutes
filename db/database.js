const mongoose = require("mongoose");

//connection mongoDB
const connection = mongoose
  .connect(mongo)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = connection;
