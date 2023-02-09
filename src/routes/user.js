const { request, response, application } = require("express");
const express = require("express");
const user = require("../models/user");
const router = express.Router();
const users = require("../middleware/userFunc")
const path = require('path');

const app = express();

//________________Register__________________

router.post("/register", async (request, response) => {
  try {
    const newUser = await users.create(request)    
    const userSaved = await newUser.save();
    await users.register(newUser,response)
  } catch (error) {
    response.json({message:error});
  }
});

//_____________________Login_____________________

router.post("/login", async (request, response) => {
    await users.login(request,response)
});

//_____________________gets__________________________
router.get("/", async (request, response) => {
  try {
    const users = await user.find();
    response.json({status:"200",data:users});
  } catch (error) {
    response.json(error);
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const userFinded = await user.findById(id);
    response.json({status:"ok",data:userFinded});
  } catch (error) {
    response.json(error);
  }
});

//____________________________Updates______________________
router.put("/:id", async (request, response) => {
  await users.update(request,response)
});

//_____________________delete________________
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const removed = await user.deleteOne({ _id: id });
    response.json(removed);
  } catch (error) {
    response.json(error);
  }
});


//__________________GET-img___________________

router.use('/img',express.static(path.join(__dirname,'../../img/user')));

app.get('/img/:image', (req, res) => {
    res.sendFile(path.join(__dirname, 'img', req.params.image));
  });



module.exports = router;
