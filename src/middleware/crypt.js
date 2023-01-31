const config = require("../config");
const bcrypt = require("bcrypt");
const saltRounds = config.SALT_ROUNDS;

createCrypt = async (password)=>{
   return await bcrypt.hash(password, Number(saltRounds))
}

compareCrypt = async (password,newPass)=>{
   return await bcrypt.compare(password,newPass)
}

module.exports = {
   createCrypt,
   compareCrypt
}