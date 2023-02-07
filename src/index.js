const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const port = config.PORT;
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const connection = require("../db/database");

app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



//connection mongoDB
connection();

app.listen(port, () => {
  console.log("Server launched at port", port);
});
