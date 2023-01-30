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

//_____________________gets__________________________
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

//____________________________Updates______________________
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const {
    name,
    surname,
    email,
    password,
    amigos,
    seguidores,
    picture,
    registro,
    web,
  } = request.body;
  userSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          name,
          surname,
          email,
          password,
          amigos,
          seguidores,
          picture,
          registro,
          web,
        },
      }
    )
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json({ message: error });
    });
});

module.exports = router;
