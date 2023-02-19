const mongoose = require("mongoose");
const express = require("express");
const comment = require("../models/comment");
const comments = require("../middleware/commentFunc");
const { request, response } = require("express");
const { resolve } = require("path");
const router = express.Router();

router.get("/", async (request, response) => {
   try {
      const comments = await comment.find();
      response.json({status:"200",data:comments});
    } catch (error) {
      response.json({error:error});
    }
});
router.get("/:post", async (request, response) => {
   try {
      const {post} = request.params
      const comments = await comment.find({post:post});
      response.json({status:"200",data:comments});
    } catch (error) {
      response.json({error:error});
    }
});


router.post("/", async (request,response)=>{
   try {
      const newComment = await comments.create(request,response)
      await newComment.save()
      response.json({status:"200",response:"comment created"})
   } catch (error) {
      console.log(error);
      response.json({error:error})
   }
})

///users?username=johndoe&email=johndoe@example.com
router.delete("/", async (request,response)=>{
   try {
      await comments.deleteComment(request,response)
   } catch (error) {
      response.json({error:error})
   }
})

router.put("/:id",async (request,response)=>{
   try {
      const {id} = request.params
      const {description} = request.body
      console.log(description);
      const updated = await comment.updateOne(
         {_id:id},
         {
            $set:{
               description,
            }
         }
      )
      response.json({status:"200",data:updated})
   } catch (error) {
      console.log(error);
      response.json({error:error})
   }
})

module.exports = router;