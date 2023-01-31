const { request, response, application } = require("express");
const express = require("express");
const user = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("../config");
const token = require("../middleware/authTokens")
const users = require("../middleware/userFunc")

//________________Register__________________

router.post("/", async (request, response) => {

  try {
    const newUser = await users.create(request)    
    const userSaved = await newUser.save();
    response.json({status:"ok",user:userSaved});
  } catch (error) {
    response.json({message:error});
  }
});

//_____________________Login_____________________

router.post("/login", async (request, response) => {
    await users.login(request,response)
});

//_____________________gets__________________________
router.get("/", async (request, response) => {
  try {
    const users = await user.find();
    response.json(users);
  } catch (error) {
    response.json(error);
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const userFinded = await user.findById(id);
    response.json(userFinded);
  } catch (error) {
    response.json(error);
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
    followers,
    picture,
    register,
    web,
  } = request.body;

  try {
    const updated = await user.updateOne(
      { _id: id },
      {
        $set: {
          name,
          surname,
          email,
          password,
          amigos,
          followers,
          picture,
          register,
          web,
        },
      }
    );

    response.json(updated);
  } catch (error) {
    response.json(error);
  }
});

//_____________________delete________________
router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const removed = await user.deleteOne({ _id: id });
    response.json(removed);
  } catch (error) {
    response.json(error);
  }
});

module.exports = router;
