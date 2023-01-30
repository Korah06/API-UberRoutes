const { request, response } = require("express");
const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

router.post("/", async (request, response) => {
  const user = userSchema(request.body);
  try {
    const userSaved = await user.save();
    response.json(userSaved);
  } catch (error) {
    response.json(error);
  }
});

//_____________________gets__________________________
router.get("/", async (request, response) => {
  try {
    const users = await userSchema.find();
    response.json(users);
  } catch (error) {
    response.json(error);
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const userFinded = await userSchema.findById(id);
    response.json(userFinded);
  } catch (error) {
    response.json({ message: error });
  }
});

//____________________________Updates______________________
router.put("/:id", async (request, response) => {
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

  try {
    const updated = await userSchema.updateOne(
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
    );

    response.json(updated);
  } catch (error) {
    response.json(error);
  }
});

module.exports = router;
