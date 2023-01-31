const mongoose = require("mongoose");
const moment = require("moment");
const postSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: moment().format("DD/MM/YYYY").toString(),
    required: true
  },
  time: {
    type: moment().format("HH:mm:ss").toString(),
    required: true
  },
  category: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  privacy: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const post = mongoose.model("post", postSchema);

module.exports = post;
