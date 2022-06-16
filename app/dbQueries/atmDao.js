let atmLists = require("../../seedData/atm.json")

const atmDao = {}

atmDao.create = (body) => {
  body.forEach((b) => b.id = Math.floor(Math.random() * 9999))
  const newList = atmLists.concat(body)
  return atmLists = newList
}

atmDao.findAll = (city) => {
  return atmLists.filter((atmList) => {
    return atmList.city === city
  })
}

atmDao.delete = (id) => {
  let index = 0
  atmLists.some((atm, i) => {
    if (atm.id === id) {
      index = i
      return true
    }
  })

  atmLists.splice(index, 1)
  return atmLists
}

atmDao.findOne = (where) => {
  return atmLists.find( ({ id }) => id === where )
}

atmDao.findOneAndUpdate = (where, body) => {
  const atm = atmDao.findOne(where)
  atm.zipcode = body.zipcode
  atm.bigger_location = body.bigger_location
  atm.city = body.city
  atm.street = body.street
  atm.location = body.location
  atm.type = body.type
  return atm
}

module.exports = atmDao
