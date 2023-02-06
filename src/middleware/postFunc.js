const post = require("../models/post");
const moment = require("moment");

create = async (req)=>{
    try {
       const newPost = new post({
        _id: req.body._id,
        description: req.body.description,
        date: moment().format("DD/MM/YYYY").toString(),
        time: moment().format("HH:mm:ss").toString(),
        category: req.body.category,
        distance: req.body.distance, 
        difficulty: req.body.difficulty,
        duration: req.body.duration,
        images: [],
        privacy: req.body.privacy,
        user: req.body.user,
        url: req.body.url
    })
    return newPost;
    } catch (error) {
       return null
    }
}

update = async (req,res)=>{
    try {
     const { id } = req.params;
     const {
      description,
      date,
      time,
      category,
      distance,
      difficulty,
      duration,
      images,
      privacy,
      user,
      url
    } = req.body;
  
     const updated = await post.updateOne(
       { _id: id },
       {
         $set: {
            description,
            date,
            time,
            category,
            distance,
            difficulty,
            duration,
            images,
            privacy,
            user,
            url
         },
       }
     );
     res.json({status:"200",post:updated});
   } catch (error) {
     res.json({status:"500",message:"No se ha podido actualizar"});
   }
}

module.exports = {
    create,
    update
 }