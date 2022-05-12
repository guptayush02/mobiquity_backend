const fileDao = require("../dbQueries/fileDao")
const { sendResponse, createJwt, comparePassword, createPassword } = require("../utils/utils")
const AWS = require('aws-sdk')
const fs = require('fs')

module.exports.upload = async(req, res) => {
  try {
    const { uploadedFile, title, description, uploadedFileName, file } = req.body
    const { id } = req.user
    if (!uploadedFile || !title || !uploadedFileName) {
      return sendResponse(res, 400, `File not found`)
    }
    AWS.config.update({ accessKeyId: "AKIAQCOSDMZIKJOLB2V6", secretAccessKey: "yXHfo+KHIPdE6tyUgeDFHtUIg9loNHjmaywKMcNv" })
    let s3 = new AWS.S3()
    const buf = Buffer.from(uploadedFile, 'base64');
    const newFile = uploadedFileName.replace(/ /g, "").split(".")
    const fileContent = fs.readFileSync(file);
    const params = {
      Bucket: 'fileuploadsystem',
      Key: `${newFile[0]}.${newFile[1]}`,
      Body: fileContent
    }
    const result = await uploadFile(s3, params)
    let body = {
      title,
      description,
      userId: id,
      url: result
    }
    await fileDao.create(body)
    return sendResponse(res, 200, `File upload successfully`)
  } catch (err) {
    return sendResponse(res, 404, `Error cought in fileController [upload] function catch block ${err}`)
  }
}

const uploadFile = (s3, params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data.Location)
    })
  })
}

module.exports.getFiles = async(req, res) => {
  try {
    const { id } = req.user
    const where = { userId: id }
    const files = await fileDao.findFilesByUserId(where)
    return sendResponse(res, 200, `user uoloaded files` , {files})
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
