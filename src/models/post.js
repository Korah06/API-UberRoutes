const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "example-post.jpg",
    },
    privacy: {
      type: String,
      required: true,
    },
    enterprise: {
      type: String,
      required: false,
      default: "No enterprise",
    },
    user: {
      type: String,
      required: true,
    },
    coordinates: [
      [
        {
          type: Number,
          required: false,
        },
      ],
    ],
    url: {
      type: String,
      required: false,
      default: "No URL",
    },
  },
  { versionKey: false }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
