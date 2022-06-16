const users = require("../../seedData/user.json")

const userDao = {}

userDao.create = (body) => {
  return users.push({...body})
}

userDao.findOne = (where) => {
  return users.find( ({ email }) => email === where )
}

module.exports = userDao
