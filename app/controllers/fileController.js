const fileDao = require("../dbQueries/fileDao")
const { sendResponse, createJwt, comparePassword, createPassword, fileUpload } = require("../utils/utils")

module.exports.upload = async(req, res) => {
  try {
    const { files, body, user } = req
    const { file } = files
    const { id } = user
    const url = await fileUpload(file)
    let data = {
      ...body,
      userId: id,
      url
    }
    await fileDao.create(data)
    return sendResponse(res, 200, `File upload successfully`)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in fileController [upload] function catch block ${err}`)
  }
}

module.exports.getFiles = async(req, res) => {
  try {
    const { id } = req.user
    const where = { userId: id }
    const files = await fileDao.findFilesByUserId(where)
    return sendResponse(res, 200, `user uploaded files` , {files})
  } catch (err) {
    return sendResponse(res, 404, `Error cought in fileController [getFiles] function catch block ${err}`)
  }
}

module.exports.delete = async(req, res) => {
  try {
    const { id } = req.params
    const where = { id }
    await fileDao.delete(where)
    return sendResponse(res, 200, `File successfully deleted`)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in fileController [delete] function catch block ${err}`)
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
