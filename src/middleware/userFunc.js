const user = require("../models/user");
const moment = require("moment");
const crypt = require("./crypt")
const token = require("./authTokens")
create = async (req)=>{

try {
   let hashedPassword = await crypt.createCrypt(req.body.password)
   const newUser = new user({
    _id: req.body._id,
    name: req.body.name,
    surname: req.body.surname,
    password: hashedPassword,
    email: req.body.email,
    amigos: [], 
    followers: [],
    picture: req.body.picture,
    register: moment().format('DD/MM/YYYY').toString(),
    web:req.body.web
})
return newUser;
   
} catch (error) {
   return null
}
}


login = async (req,res)=>{
   try {

   const {_id,password} = req.body

   const userFinded = await user.findById(_id);
   const validPassword = await crypt.compareCrypt(password,userFinded.password)
   
    if (validPassword) {
      const Token = token.create(_id)
      res.json({message:"logged",token:Token})
    }else{
      res.json({message:"not logged"})
    }

   } catch (error) {
      res.json({message:"No existe ese usuario",error:error})
   }
   

}

module.exports = {
   create,
   login
}