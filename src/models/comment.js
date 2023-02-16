const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
   date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
},{versionKey:false});  

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
