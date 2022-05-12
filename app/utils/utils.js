const jwt = require('jsonwebtoken');
const config = require("../../config/envConfig")
const bcrypt = require('bcrypt')
const AWS = require('aws-sdk')

module.exports.sendResponse = (res, code, message, body) => {
  res.send(code, { code, message, body });
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

module.exports.fileUpload = async(file) => {
  const fileName = file.name.replace(/ /g, "").split(".")
  AWS.config.update({ accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey })
  let s3 = new AWS.S3()
  const params = {
    Key: `${fileName[0]}.${fileName[fileName.length - 1 ]}`,
    Body: file.data,
    Bucket: config.bucket
  };
  return await uploadFile(s3, params)
}

const uploadFile = (s3, params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data.Location)
    })
  })
}
