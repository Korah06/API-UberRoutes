const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const app = express();
const port = config.PORT;
const mongo = config.MONGO;
const userRoutes = require("./routes/user");

app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (request, response) => {
  response.send("Hello");
});

//connection mongoDB
mongoose
  .connect(mongo)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log("Server launched at port", port);
});
