const express = require("express");
const comment = require("../models/comment");
const comments = require("../middleware/commentFunc")
const router = express.Router();

router.get("/", async (request, response) => {
   try {
      const comments = await comment.find();
      response.json({status:"200",data:comments});
    } catch (error) {
      response.json(error);
    }
});
router.get("/:post", async (request, response) => {
   try {
      const {post} = request.params
      const comments = await comment.find({post:post});
      response.json({status:"200",data:comments});
    } catch (error) {
      response.json(error);
    }
});


router.post("/", async (request,response)=>{
   try {
      const newComment = comments.create(request,response)
      await newComment.save()
      response.json({status:"200",response:"comment created"})
   } catch (error) {
      response.json(error)
   }
})


module.exports = router;