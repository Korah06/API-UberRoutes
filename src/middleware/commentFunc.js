const comment = require("../models/comment");
const moment = require("moment");

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

module.exports = {
   create,
}