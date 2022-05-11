const userDao = require("../dbQueries/userDao")
const { sendResponse, createJwt, comparePassword, createPassword } = require("../utils/utils")

module.exports.signup = async(req, res) => {
  try {
    const { name, email, password } = req.body
    if (!email || !password) {
      return sendResponse(res, 400, "Email and password are require fields")
    }
    const where = { email }
    const user = await userDao.findOne(where)
    if (user) {
      return sendResponse(res, 400, "Email already exists")
    }
    const body = {
      name,
      email,
      password: await createPassword(password)
    }
    await userDao.create(body)
    return sendResponse(res, 200, "Successfully Create your account")
  } catch (error) {
    return sendResponse(res, 404, `Error cought in [signup] catch block ${error}`)
  }
}

module.exports.login = async(req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return sendResponse(res, 400, "Email and password are require fields")
    }
    const where = { email }
    const user = await userDao.findOne(where)
    if (!user) {
      return sendResponse(res, 400, "Email does not exists")
    }
    if (!await comparePassword(password, user.password)) {
      return sendResponse(res, 400, "Password not match")
    }
    const token = await createJwt(user)
    user.token = token
    await user.save()
    return sendResponse(res, 200, "Loggedin Successfully", { token })

  } catch (error) {
    return sendResponse(res, 404, `Error cought in [login] catch block ${error}`)
  }
}
