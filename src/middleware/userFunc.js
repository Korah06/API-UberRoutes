const user = require("../models/user");
const moment = require("moment");
const crypt = require("./crypt")
const token = require("./authTokens")

create = async (req)=>{
try {
   let hashedPassword = await crypt.createCrypt(req.body.password)
   const newUser = new user({
    _id: req.body._id.replace("/","").replace("\\",""),
    name: req.body.name,
    surname: req.body.surname,
    password: hashedPassword,
    email: req.body.email,
    amigos: [], 
    followers: [],
    picture: req.body.picture,
    register: moment().format('DD/MM/YYYY').toString(),
    web:req.body.web,
    admin:req.body.admin
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
      res.json({status:"200",token:Token,data:userFinded})
    }else{
      res.json({status:"401"})
    }

   } catch (error) {
      res.json({status:"404",error:error})
   }
}

register = async (userRegistered,res) =>{

   const Token = token.create(userRegistered._id)
      res.json({status:"200",token:Token})

}

update = async (req,res)=>{
  try {
   const { id } = req.params;
   const {
    name,
    surname,
    email,
    password,
    amigos,
    followers,
    picture,
    register,
    web,
  } = req.body;

   const updated = await user.updateOne(
     { _id: id },
     {
       $set: {
         name,
         surname,
         email,
         password,
         amigos,
         followers,
         picture,
         register,
         web,
       },
     }
   );
   res.json({status:"200",user:updated});
 } catch (error) {
   res.json({status:"500",message:"No se ha podido actualizar"});
 }

}

module.exports = {
   create,
   login,
   update,
   register
}