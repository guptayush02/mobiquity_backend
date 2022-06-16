const jwt = require('jsonwebtoken')
const config = require("../../config/envConfig")
const userDao = require("../dbQueries/userDao")
const { sendResponse } = require("../utils/utils")

module.exports.authentication = async(req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) {
      return sendResponse(res, 401, {message: `token does not exists`})
    }
    jwt.verify(token, config.TokenSecret, async(err, user) => {
      const currentUser = await userDao.findOne(user)
      if (!currentUser) {
        return sendResponse(res, 403, {message: `Invalid token`})
      }

      req.user = currentUser
      delete req.user.password
      next()
    })
  } catch (error) {
    return sendResponse(res, 404, {message: `Error cought in [authentication] catch block ${error}`})
  }
}
