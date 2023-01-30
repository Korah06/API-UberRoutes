const { request, response } = require("express");
const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

router.post("/", (request, response) => {
  const user = userSchema(request.body);
  user
    .save()
    .then((data) => response.json(data))
    .catch((error) => {
      response.json({ message: error });
    });
});

router.get("/", (request, response) => {
  userSchema
    .find()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json({ message: error });
    });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  userSchema
    .findById(id)
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json({ message: error });
    });
});

module.exports = router;
