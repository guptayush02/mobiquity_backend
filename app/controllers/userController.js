const userDao = require("../dbQueries/userDao")
const { sendResponse, createJwt, comparePassword, createPassword } = require("../utils/utils")

module.exports.signup = async(req, res) => {
  try {
    const { name, email, password } = req.body
    if (!email || !password) {
      return sendResponse(res, 400, {message: "Email and password are require fields"})
    }
    const where = { email }
    const user = await userDao.findOne(where)
    if (user) {
      return sendResponse(res, 400, {message: "Email already exists"})
    }
    const body = {
      name,
      email,
      password: await createPassword(password)
    }
    await userDao.create(body)
    return sendResponse(res, 200, {message: "Successfully Create your account"})
  } catch (error) {
    console.log("error-->", error)
    return sendResponse(res, 404, {message: `Error cought in [signup] catch block ${error}`})
  }
}

module.exports.login = async(req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return sendResponse(res, 400, {message: "Email and password are require fields"})
    }
    const where = { email }
    const user = await userDao.findOne(where)
    if (!user) {
      return sendResponse(res, 400, {message: "Email does not exists"})
    }
    if (!await comparePassword(password, user.password)) {
      return sendResponse(res, 400, {message: "Password not match"})
    }
    const token = await createJwt(user)
    user.token = token
    await user.save()
    return sendResponse(res, 200, {message: "Loggedin Successfully", body: {token}})

  } catch (error) {
    return sendResponse(res, 404, {message: `Error cought in [login] catch block ${error}`})
  }
}
