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
  following: {
    type: [String],
    required: true,
  },
  followers: {
    type: [String],
    required: true,
  },
  picture: {
    type: String,
    required: false,
    default:"example-user.png"
  },
  register: {
    type: String,
    required: true,
  },
  web: {
    type: String,
    required: false,
    default: "No Web"
  },
  admin:{
    type:Boolean,
    required:false,
    default:false
  },
},{versionKey:false});

const user = mongoose.model("user", userSchema);

module.exports = user;
