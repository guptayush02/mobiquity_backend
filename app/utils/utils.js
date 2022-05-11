const jwt = require('jsonwebtoken');
const config = require("../../config/envConfig")
const bcrypt = require('bcrypt')

module.exports.sendResponse = (res, code, body) => {
  res.send(code, { code, body });
}

module.exports.createJwt = (user) => {
  return jwt.sign(user.email, config.TokenSecret);
}

module.exports.comparePassword = (password, userPassword) => {
  return bcrypt.compare(password, userPassword)
}

module.exports.createPassword = (password) => {
  console.log("config-->", config)
  const {salt} = config
  console.log("salt-->", salt)
  return bcrypt.hashSync(password, salt)
}
