const fileDao = require("../dbQueries/fileDao")
const { sendResponse, createJwt, comparePassword, createPassword } = require("../utils/utils")

module.exports.upload = async(req, res) => {
  try {
    const { url, title } = req.body
    const { id } = req.user
    if (!url || !title) {
      return sendResponse(res, 404, `File not found`)
    }
    const body = {
      ...req.body,
      userId: id
    }
    await fileDao.create(body)
    return sendResponse(res, 200, `File upload successfully`)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in fileController [upload] function catch block ${error}`)
  }
}

module.exports.getFiles = async(req, res) => {
  try {
    const { id } = req.user
    const where = { userId: id }
    const files = await fileDao.findFilesByUserId(where)
    return sendResponse(res, 200, `user uoloaded files` , {files})
  } catch (err) {
    return sendResponse(res, 404, `Error cought in fileController [getFiles] function catch block ${error}`)
  }
}

module.exports.delete = async(req, res) => {
  try {
    const { id } = req.params
    const where = { id }
    await fileDao.delete(where)
    return sendResponse(res, 200, `File successfully deleted`)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in fileController [delete] function catch block ${error}`)
  }
}

module.exports.publicFile = async(req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      return sendResponse(res, 400, `Required parameter missing`)
    }
    const where = { id }
    const file = await fileDao.findOne(where)
    if (!file) {
      return sendResponse(res, 400, `File not found`)
    }
    return sendResponse(res, 200, `User uploaded files`, {publicUrl: file.url})
  } catch (error) {
    return sendResponse(res, 404, `Error cought in fileController [delete] function catch block ${error}`)
  }
}
