const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
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
  },
  { versionKey: false }
);

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
