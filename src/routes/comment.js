const express = require("express");
const comment = require("../models/comment");
const router = express.Router();

router.get("/", async (request, response) => {
   try {
      const comments = await comment.find();
      response.json({status:"200",data:posts});
    } catch (error) {
      response.json(error);
    }
});

module.exports = router;