const { request, response } = require("express");
const express = require("express");
const user = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const moment = require("moment")
const config = require("../config");

const saltRounds = config.SALT_ROUNDS;

router.post("/", async (request, response) => {

  let hashedPassword = bcrypt.hashSync(request.body.password, Number(saltRounds))
  const newUser = new user({
    _id: request.body._id,
    name: request.body.name,
    surname: request.body.surname,
    password: hashedPassword,
    email: request.body.email,
    amigos: [], 
    seguidores: [],
    picture: request.body.picture,
    registro: moment().format('DD/MM/YYYY').toString(),
    web:request.body.web
})

  try {
    const userSaved = await newUser.save();
    response.json(userSaved);
  } catch (error) {
    response.json({message:error});
  }
});

//_____________________Login_____________________

router.post("/login", async (request, response) => {

  const {_id,password} = request.body

  try {

    const userFinded = await user.findById(_id);
    const validPassword = await bcrypt.compare(password,userFinded.password)

    if (validPassword) {
      response.json({message:"logged"})
    }else{
      response.json({message:"not logged"})
    }

  } catch (error) {
    response.json({message:error});
  }
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
    seguidores,
    picture,
    registro,
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
