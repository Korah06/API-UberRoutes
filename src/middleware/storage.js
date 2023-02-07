const multer = require("multer");

const storagePost = multer.diskStorage({
   destination: (req,file,cb)=>{
      cb(null,'../../img/post')
   },
   filename: (req,file,cb)=>{
      cb(null,`${file.fieldname}`)
   }
})