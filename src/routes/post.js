const { request, response, application } = require("express");
const express = require("express");
const post = require("../models/post");
const comment = require("../models/comment");
const router = express.Router();
const posts = require("../middleware/postFunc");
const path = require("path");
const token = require("../middleware/authTokens");
const multer = require("multer");

const storage = require("../middleware/storage");

const app = express();

//_________________Create______________
router.post("/create", async (request, response) => {
  try {
    const verified = token.verify(
      request.headers["authorization"].split(" ")[1]
    );
    if (verified) {
      const newPost = await posts.create(request);
      await newPost.save();
      response
        .status(200)
        .json({ status: "200", message: "Post creado correctamente" });
    } else {
      response.json({ status: 403, message: "Forbidden" });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ status: "400", message: error });
  }
});

//_________________gets__________________
router.get("/", async (request, response) => {
  try {
    const verified = token.verify(
      request.headers["authorization"].split(" ")[1]
    );

    if (verified) {
      const posts = await post.find();
      response.status(200).json({ status: "200", data: posts });
    } else {
      response.status(403).json({ status: 403, message: "Forbidden" });
    }
  } catch (error) {
    response.status(500).json({ status: "500", message: "Server error" });
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const verified = token.verify(
      request.headers["authorization"].split(" ")[1]
    );

    if (verified) {
      const postFinded = await post.findById(id);
      response.status(200).json({ status: "200", data: postFinded });
    } else {
      response.status(403).json({ status: "403", message: "forbidden" });
    }
  } catch (error) {
    response.status(500).json({ status: "500", message: "Server error" });
  }
});

router.post("/byuser", async (request, response) => {
  try {
    const verified = token.verify(
      request.headers["authorization"].split(" ")[1]
    );

    if (verified) {
      const { user } = request.body;
      const posts = await post.find({ user: user });
      response.status(200).json({ status: "200", data: posts });
    } else {
      response.status(403).json({ status: "403", message: "forbidden" });
    }
  } catch (error) {
    response.status(500).json({ status: "500", message: "Server error" });
  }
});

//_________________________Update______________________
router.put("/:id", async (request, response) => {
  const verified = token.verify(request.headers["authorization"].split(" ")[1]);
  if (verified) {
    await posts.update(request, response);
  } else {
    response.status(403).json({ status: "403", message: "forbidden" });
  }
});

router.put("/admupdate/:id", async (request, response) => {
  const verified = token.verify(request.headers["authorization"].split(" ")[1]);

  if (verified) {
    await posts.admUpdate(request, response);
  } else {
    response.status(403).json({ status: "403", message: "forbidden" });
  }
});

//_____________________delete________________
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const verified = token.verify(
      request.headers["authorization"].split(" ")[1]
    );
    if (verified) {
      const removed = await post.deleteOne({ _id: id });
      await comment.deleteMany({ post: id });
      response.status(200).json({ status: "200", data: removed });
    } else {
      response.status(403).json({ status: "403", message: "forbidden" });
    }
  } catch (error) {
    response.status(500).json({ status: "500", message: "Server error" });
  }
});

//___________________get-img_____________________

router.use("/img", express.static(path.join(__dirname, "../../img/post")));

app.get("/img/:image", (req, res) => {
  const verified = token.verify(request.headers["authorization"].split(" ")[1]);
  if (verified) {
    res.sendFile(path.join(__dirname, "img", req.params.image));
  } else {
    response.status(403).json({ status: "403", message: "forbidden" });
  }
});

//___________________save-img____________________

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, './img/post');
//     },
//   filename: function (req, file, cb) {
//       cb(null, file.originalname);
//   }
// });
const upload = multer({ storage: storage.storagePost });

router.post("/img", upload.single("image"), async (req, res) => {
  console.log("ha recibido");
  res.status(201).send("Image uploaded succesfully");
});

router.put("/deleteimg/:id", async (req, res) => {
  try {
    const header = req.headers["authorization"];
    console.log(header);
    const verified = token.verify(header.split(" ")[1]);
    if (verified) {
      const { id } = req.params;
      image = {
        image: "example-post.jpg",
      };

      const updated = await post.updateOne(
        { _id: id },
        {
          $set: image,
        }
      );
      res.status(200).json({ status: "200", post: updated });
    } else {
      res.status(403).json({ status: "403", message: "forbidden" });
    }
  } catch (error) {
    res.status(500).json({ status: "500", message: error });
    console.log(error);
  }
});

module.exports = router;
