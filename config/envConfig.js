const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  salt: process.env.SALT,
  TokenSecret: process.env.TOKEN_SECRET,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  bucket: process.env.BUCKET
};
