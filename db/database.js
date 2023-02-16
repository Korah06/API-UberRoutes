const mongoose = require("mongoose");
const config = require("../src/config");
const mongo = config.MONGO;
mongoose.set('strictQuery',true)

//connection mongoDB
const connection = async () => {
  try {
    await mongoose.connect(mongo);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
