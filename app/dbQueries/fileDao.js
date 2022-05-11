const db = require("../../models")

const fileDao = {}

fileDao.create = (body) => {
  return new Promise((resolve, reject) => {
    db.File.create(body).then((result, err) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

fileDao.findFilesByUserId = (where) => {
  return new Promise((resolve, reject) => {
    db.File.findAll({where}).then((result, err) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

fileDao.delete = (where) => {
  return new Promise((resolve, reject) => {
    db.File.destroy({where}).then((result, err) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

fileDao.findOne = (where) => {
  return new Promise((resolve, reject) => {
    db.File.findOne({where}).then((result, err) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = fileDao
