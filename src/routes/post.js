const { request, response, application } = require("express");
const express = require("express");
const post = require("../models/post");
const router = express.Router();
const posts = require("../middleware/postFunc")

//_________________Create______________
router.post("/create", async (request, response) => {
    try {
      const newPost = await posts.create(request)    
      const postSaved = await newPost.save();
      response.json({status:"200",message:"Post creado correctamente"})
    } catch (error) {
      response.json({message:error});
    }
});

//_________________gets__________________
router.get("/", async (request, response) => {
    try {
      const posts = await post.find();
      response.json(posts);
    } catch (error) {
      response.json(error);
    }
});
  
router.get("/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const postFinded = await post.findById(id);
        response.json({status:"ok",data:postFinded});
    } catch (error) {
        response.json(error);
    }
});

//_________________________Update______________________
router.put("/:id", async (request, response) => {
    await posts.update(request,response)
});

//_____________________delete________________
router.delete("/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const removed = await post.deleteOne({ _id: id });
        response.json(removed);
    } catch (error) {
        response.json(error);
    }
});

module.exports = router;
