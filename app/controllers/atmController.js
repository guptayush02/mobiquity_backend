const atmDao = require("../dbQueries/atmDao")
const { sendResponse } = require("../utils/utils")

module.exports.create = async(req, res) => {
  try {

    const { body } = req
    const atms = atmDao.create(body)

    return sendResponse(res, 200, `Atm List get successfully`, atms)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in atmController [create] function catch block ${err}`)
  }
}

module.exports.list = async(req, res) => {
  try {

    const { city } = req.query
    const lists = atmDao.findAll(city)
    if (!lists.length) {
      return sendResponse(res, 400, `Atm List Not Available`)
    }

    return sendResponse(res, 200, `Atm List get successfully`, lists)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in atmController [list] function catch block ${err}`)
  }
}

module.exports.delete = async(req, res) => {
  try {

    const { id } = req.params
    const result = atmDao.delete(id)

    return sendResponse(res, 200, `Atm List get successfully`, result)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in atmController [delete] function catch block ${err}`)
  }
}

module.exports.update = async(req, res) => {
  try {

    const { id } = req.params
    const { body } = req
    const atm = atmDao.findOneAndUpdate(Number(id), body)

    return sendResponse(res, 200, `Atm List get successfully`, atm)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in atmController [update] function catch block ${err}`)
  }
}
