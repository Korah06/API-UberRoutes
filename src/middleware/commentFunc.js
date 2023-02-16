const comment = require("../models/comment");
const moment = require("moment");
const { request } = require("express");

create = async (req,res)=>{
   try {
      const newComment = new comment({
         date: moment().format("DD-MM-YYYY").toString(),
         time:moment().format("hh:mm:ss").toString(),
         description:req.body.description,
         user:req.body.user,
         post:req.body.post
      })
      return newComment;
   } catch (error) {
      res.json({error})
   }
}

updateDescription = async(req,res)=>{
   try {

      const { id } = req.params;
     const {
      post,
      user,
      description
    } = req.body;

    const updated = await comment.updateOne(
      { _id: id,user:user,post:post },
      {$set:{description}}
    )
      res.json({status:"200",data:updated})
   } catch (error) {
      res.json({error})
   }
}

deleteComment = async(req,res)=>{
   try {
      const { id } = request.params;
      const {user} = request.body
      const commentToDelete = comment.findOne({_id:id,user:user})
      if(commentToDelete){
         const deleted = await comment.deleteOne(commentToDelete)
         res.json({status:"200",data:deleted})
      }else{
         res.json({status:"404",response:"Not Found"})
      }
   } catch (error) {
      res.json({error})
   }
}

module.exports = {
   create,
   updateDescription,
   deleteComment
} 