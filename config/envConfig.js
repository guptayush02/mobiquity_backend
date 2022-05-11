const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  salt: process.env.SALT,
  TokenSecret: process.env.TOKEN_SECRET
};
