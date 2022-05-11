const express = require("express")
const userController = require('../controllers/userController')
const fileController = require("../controllers/fileController")
const {authentication} = require("../middleware/checkUser")

module.exports = (app) => {
  const router = express.Router()

  router.post('/signup', userController.signup)
  router.post('/login', userController.login)

  router.post('/upload-file', authentication, fileController.upload)
  router.get('/files', authentication, fileController.getFiles)
  router.delete('/file/:id', authentication, fileController.delete)
  router.get('/public-file', authentication, fileController.publicFile)

  app.use('/api/v1', router)
}
