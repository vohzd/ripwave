const jwt         = require("jsonwebtoken");
const { secret }  = require("../config/keys/jwtSecret.js");

function verifyJWT(token){

  if (!token) return;

  try {
    return jwt.verify(token, secret)
  }
  catch (e){
    return []
    //throw { httpCode: 401, message: e }
  }
}

function signJWT(payload){
  return jwt.sign(payload, secret, { expiresIn: "2hr" });
}

module.exports = {
  verifyJWT,
  signJWT
}
