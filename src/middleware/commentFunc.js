const comment = require("../models/comment");
const moment = require("moment");
const { request } = require("express");

create = async (req, res) => {
  try {
    const newComment = new comment({
      date: moment().format("DD-MM-YYYY").toString(),
      time: moment().format("hh:mm:ss").toString(),
      description: req.body.description,
      user: req.body.user,
      post: req.body.post,
    });
    return newComment;
  } catch (error) {
    res.status(500).json({ status: "500", message: "server error" });
  }
};

deleteComment = async (request, response) => {
  try {
    const { id, user } = request.query;
    const query = { _id: id, user: user };
    console.log(id);
    console.log(user);
    const commentFinded = await comment.findOne(query);
    console.log(commentFinded);
    if (commentFinded) {
      const removed = await comment.deleteOne({ _id: id });
      response.status(200).json({ status: "200", data: removed });
    } else {
      response.status(404).json({
        status: "404",
        response: "El comentario no es del usuario correspondiente",
      });
    }
  } catch (error) {
    response.status(500).json({ status: "200", message: "server error" });
  }
};

admDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await comment.deleteOne({ _id: id });
    res.status(200).json({ status: "200", data: removed });
  } catch (error) {
    response.status(500).json({ status: "500", message: "server error" });
  }
};

module.exports = {
  create,
  deleteComment,
  admDelete,
};
