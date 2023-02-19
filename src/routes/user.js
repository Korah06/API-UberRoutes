const { request, response, application } = require("express");
const express = require("express");
const user = require("../models/user");
const comment = require("../models/comment");
const router = express.Router();
const users = require("../middleware/userFunc");
const path = require("path");
const storage = require("../middleware/storage");
const token = require("../middleware/authTokens");
const app = express();
const multer = require("multer");
//________________Register__________________

router.post("/register", async (request, response) => {
  try {
    const newUser = await users.create(request)
    const userSaved = await newUser.save();
    await users.register(newUser, response);
  } catch (error) {
    console.log(error)
    response.json({message:error});
  }
});

//_____________________Login_____________________

router.post("/login", async (request, response) => {
  await users.login(request, response);
});

//_____________________gets__________________________
router.get("/", async (request, response) => {
  try {
    const verified = token.verify(
      request.headers["authorization"].split(" ")[1]
    );
    if (verified) {
      const users = await user.find();
      response.json({ status: "200", data: users });
    } else {
      response.status(403);
    }
  } catch (error) {
    response.json(error);
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const verified = token.verify(
      request.headers["authorization"].split(" ")[1]
    );
    if (verified) {
      const userFinded = await user.findById(id);
      response.json({ status: "ok", data: userFinded });
    } else {
      response.status(403);
    }
  } catch (error) {
    response.json(error);
  }
});

//____________________________Updates______________________
router.put("/:id", async (request, response) => {
  const verified = token.verify(request.headers["authorization"].split(" ")[1]);
  if (verified) {
    await users.update(request, response);
  } else {
    response.status(403);
  }
});

router.put("/adm/:id", async (request, response) => {
  const verified = token.verify(request.headers["authorization"].split(" ")[1]);
  if (verified) {
    await users.admUpdate(request, response);
  } else {
    response.json(403);
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
      const removed = await user.deleteOne({ _id: id });
      await comment.deleteMany({ user: id });
      response.json({ status: "200", data: removed });
    } else {
      response.status(403);
    }
  } catch (error) {
    response.json({ error: error });
  }
});

//__________________GET-img___________________

router.use("/img", express.static(path.join(__dirname, "../../img/user")));

app.get("/img/:image", (req, res) => {
  const verified = token.verify(request.headers["authorization"].split(" ")[1]);
  if (verified) {
    res.sendFile(path.join(__dirname, "img", req.params.image));
  } else {
    response.status(403);
  }
});

//_____________________Post-img___________________________
const upload = multer({ storage: storage.storageUser });

router.post("/img", upload.single("image"), async (req, res) => {
  res.status(201).send("Image uploaded succesfully");
});

router.put("/deleteimg/:id", async (req, res) => {
  try {
    const verified = token.verify(req.headers["authorization"].split(" ")[1]);
    if (verified) {
      const { id } = req.params;
      picture = {
        picture: "example-user.png",
      };

      const updated = await user.updateOne(
        { _id: id },
        {
          $set: picture,
        }
      );
      res.json({ status: "200", post: updated });
    } else {
      res.status(403);
    }
  } catch (error) {
    res.json({ status: "500", message: error });
    console.log(error);
  }
});

module.exports = router;
