const post = require("../models/post");
const moment = require("moment");

create = async (req)=>{
    try {
       const newPost = new post({
        _id:req.body.name.replace(/\s/g, '')+"-"+moment().format("DD-MM-YYYY-hh:mm:ss").toString(),
        name: req.body.name,
        description: req.body.description,
        date: moment().format("DD-MM-YYYY").toString(),
        category: req.body.category,
        distance: req.body.distance, 
        difficulty: req.body.difficulty,
        duration: req.body.duration,
        image: req.body.image,
        privacy: req.body.privacy,
        user: req.body.user,
        enterprise:req.body.enterprise,
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
      name,
      date,
      category,
      distance,
      difficulty,
      duration,
      image,
      privacy,
      user,
      enterprise,
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
            image,
            name,
            enterprise,
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

admUpdate = async (req,res)=>{
  try {
   const { id } = req.params;
   const {
    name,
    category,
    distance,
    difficulty,
  } = req.body;

   const updated = await post.updateOne(
     { _id: id },
     {
       $set: {
          name,
          category,
          distance,
          difficulty
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
    update,
    admUpdate
 }