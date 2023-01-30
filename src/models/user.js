const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  amigos: {
    type: [String],
    required: true,
  },
  seguidores: {
    type: [String],
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  registro: {
    type: String,
    required: true,
  },
  web: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
