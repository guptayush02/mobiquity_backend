const jwt = require('jsonwebtoken');
const config = require("../../config/envConfig")
const bcrypt = require('bcrypt')
const AWS = require('aws-sdk')

module.exports.sendResponse = (res, code, message, body) => {
  return res.send(code, { code, message, body });
}

module.exports.createJwt = (user) => {
  return jwt.sign(user.email, config.TokenSecret);
}

module.exports.comparePassword = (password, userPassword) => {
  return bcrypt.compare(password, userPassword)
}

module.exports.createPassword = (password) => {
  const {salt} = config
  return bcrypt.hashSync(password, salt)
}
