const user = require("../models/user");
const moment = require("moment");
const crypt = require("./crypt");
const token = require("./authTokens");

create = async (req) => {
  try {
    let hashedPassword = await crypt.createCrypt(req.body.password);
    const newUser = new user({
      //_id: req.body._id.replace("/","").replace("\\",""),
      _id: req.body._id,
      name: req.body.name,
      surname: req.body.surname,
      password: hashedPassword,
      email: req.body.email,
      amigos: [],
      followers: [],
      picture: req.body.picture,
      register: moment().format("DD/MM/YYYY").toString(),
      web: req.body.web,
      admin: req.body.admin,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

login = async (req, res) => {
  try {
    const { _id, password } = req.body;

    const userFinded = await user.findById(_id);
    const validPassword = await crypt.compareCrypt(
      password,
      userFinded.password
    );

    if (validPassword) {
      const Token = token.create(_id);
      res.json({ status: "200", token: Token, data: userFinded });
    } else {
      res.json({ status: "401" });
    }
  } catch (error) {
    res.json({ status: "404", error: error });
  }
};

register = async (userRegistered, res) => {
  const Token = token.create(userRegistered._id);
  res.json({ status: "200", token: Token });
};

update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      surname,
      email,
      password,
      following,
      followers,
      picture,
      register,
      web,
    } = req.body;

    const updated = await user.updateOne(
      { _id: id },
      {
        $set: {
          name,
          surname,
          email,
          password,
          following,
          followers,
          picture,
          register,
          web,
        },
      }
    );
    res.json({ status: "200", user: updated });
  } catch (error) {
    res.json({ status: "500", message: "No se ha podido actualizar" });
  }
};

admUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, web, admin } = req.body;

    const updated = await user.updateOne(
      { _id: id },
      {
        $set: {
          name,
          surname,
          web,
          admin,
        },
      }
    );

    res.json({ status: "200", user: updated });
  } catch (error) {
    console.log(error);
    res.json({ status: "500", message: "No se ha podido actualizar" });
  }
};

updateFollowers = async (req, res) => {
  try {
    const { idF } = req.params;
    const { id } = req.body;

    const { follower } = user.findById(idF);
    const { following } = user.findById(id);
    const followingF = following.following;
    const followerU = follower.followers;
    followingF.push(idF);
    followerU.push(id);

    const updatedU = await user.updateOne(
      { _id: id },
      {
        $set: {
          following: followingF,
        },
      }
    );

    const updatedF = await user.updateOne(
      { _id: idF },
      {
        $set: {
          followers: followerU,
        },
      }
    );

    res.json({ status: "200", following: updatedU, follower: updatedF });
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = {
  create,
  login,
  update,
  register,
  admUpdate,
  updateFollowers,
};
