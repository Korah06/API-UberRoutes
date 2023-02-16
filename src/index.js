const express = require("express");
const config = require("./config");
const port = config.PORT;
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const connection = require("../db/database");



app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

//connection mongoDB
connection();

app.listen(port, () => {
  console.log("Server launched at port", port);
});
