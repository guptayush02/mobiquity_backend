const db = require("../../models")

const userDao = {}

userDao.create = (body) => {
  return new Promise((resolve, reject) => {
    db.User.create(body).then((result, err) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

userDao.findOne = (where) => {
  return new Promise((resolve, reject) => {
    db.User.findOne({where}).then((result, err) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = userDao
