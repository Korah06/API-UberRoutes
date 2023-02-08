const { request, response, application } = require("express");
const express = require("express");
const post = require("../models/post");
const router = express.Router();
const posts = require("../middleware/postFunc")
const path = require('path');
const fs = require('fs');
const multer  = require('multer');

const app = express();

//_________________Create______________
router.post("/create", async (request, response) => {
    try {
      const newPost = await posts.create(request)
      await newPost.save()
      response.json({status:"200",message:"Post creado correctamente"})
    } catch (error) {
      console.log(error)
      response.json({status:"400" ,message:error});
    }
});

//_________________gets__________________
router.get("/", async (request, response) => {
    try {
      const posts = await post.find();
      response.json({"status":"200","data":posts});
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

//___________________get-img_____________________

router.use('/img',express.static(path.join(__dirname,'../../img/post')));

app.get('/img/:image', (req, res) => {
    res.sendFile(path.join(__dirname, 'img', req.params.image));
  });



//___________________save-img____________________

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './img/post');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({storage: storage})

router.post('/img', upload.single('image'), async (req, res) => {
  res.status(201).send('Image uploaded succesfully')
})




module.exports = router;
