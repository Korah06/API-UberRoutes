const multer = require("multer");

storagePost = multer.diskStorage({
   destination: (req,file,cb)=>{
      cb(null,'./img/post')
   },
   filename: (req,file,cb)=>{
      cb(null,file.originalname)
   }
})

storageUser = multer.diskStorage({
   destination: (req,file,cb)=>{
      cb(null,'./img/user')
   },
   filename: (req,file,cb)=>{
      cb(null,file.originalname)
   }
})

module.exports = {
   storagePost,
   storageUser
}