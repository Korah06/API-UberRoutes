const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const port = config.PORT;
const app = express();
const userRoutes = require("./routes/user");

const connection = require("../db/database");

app.use(express.json());
app.use("/users", userRoutes);


//connection mongoDB
connection();

app.listen(port, () => {
  console.log("Server launched at port", port);
});
