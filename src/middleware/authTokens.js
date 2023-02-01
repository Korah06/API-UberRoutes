const jwt = require('jsonwebtoken')
const keys = require('../keys')

const create = (user) =>{
   return jwt.sign({user:user}, keys.key,{expiresIn:"2d"})
}

const verify = (token)=>{
   const payload = jwt.verify(token,keys.key)
   return payload
}

module.exports = {
   create,
   verify,
}