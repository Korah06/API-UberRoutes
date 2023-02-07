const mongoose = require("mongoose");
const moment = require("moment");
const postSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: false
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
  image: {
    type: String,
    required: true
  },
  privacy: {
    type: String,
    required: true
  },
  enterprise:{
    type:String,
    required:false
  },
  user: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  }
});

const post = mongoose.model("post", postSchema);

module.exports = post;
