const jwt = require('jsonwebtoken')
const config = require("../../config/envConfig")
const userDao = require("../dbQueries/userDao")
const { sendResponse } = require("../utils/utils")

module.exports.authentication = async(req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) {
      return sendResponse(res, 401, {message: `token dows not exists`})
    }
    jwt.verify(token, config.TokenSecret, async(err, user) => {
      if (err) return res.sendStatus(403)
      const where = { email: user }
      const currentUser = await userDao.findOne(where)
      if (!currentUser) {
        return sendResponse(res, 403, {message: `Invalid token`})
      }
  
      req.user = currentUser.dataValues
      delete req.user.password
  
      next()
    })
  } catch (error) {
    return sendResponse(res, 404, {message: `Error cought in [authentication] catch block ${error}`})
  }
}
