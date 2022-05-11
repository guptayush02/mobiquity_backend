const fileDao = require("../dbQueries/fileDao")
const { sendResponse, createJwt, comparePassword, createPassword } = require("../utils/utils")

module.exports.upload = async(req, res) => {
  try {
    const { url, title } = req.body
    const { id } = req.user
    if (!url || !title) {
      return sendResponse(res, 404, {message: `File not found`})
    }
    const body = {
      ...req.body,
      userId: id
    }
    await fileDao.create(body)
    return sendResponse(res, 200, {message: `File upload successfully`})
  } catch (err) {
    return sendResponse(res, 404, {message: `Error cought in fileController [upload] function catch block ${error}`})
  }
}

module.exports.getFiles = async(req, res) => {
  try {
    const { id } = req.user
    const where = { userId: id }
    const files = await fileDao.findFilesByUserId(where)
    return sendResponse(res, 200, {message: `user uoloaded files`, data: {files}})
  } catch (err) {
    return sendResponse(res, 404, {message: `Error cought in fileController [getFiles] function catch block ${error}`})
  }
}

module.exports.delete = async(req, res) => {
  try {
    const { id } = req.params
    const where = { id }
    await fileDao.delete(where)
    return sendResponse(res, 200, {message: `File successfully deleted`})
  } catch (err) {
    return sendResponse(res, 404, {message: `Error cought in fileController [delete] function catch block ${error}`})
  }
}

module.exports.publicFile = async(req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      return sendResponse(res, 400, {message: `Required parameter missing`})
    }
    const where = { id }
    const file = await fileDao.findOne(where)
    if (!file) {
      return sendResponse(res, 400, {message: `File not found`})
    }
    return sendResponse(res, 200, {message: `User uploaded files`, data: {publicUrl: file.url}})
  } catch (error) {
    return sendResponse(res, 404, {message: `Error cought in fileController [delete] function catch block ${error}`})
  }
}
