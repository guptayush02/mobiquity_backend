const express = require("express")
const userController = require('../controllers/userController')
const atmController = require("../controllers/atmController")
const {authentication} = require("../middleware/checkUser")

module.exports = (app) => {
  const router = express.Router()

  router.post('/signup', userController.signup)
  router.post('/login', userController.login)

  router.get('/atm-lists', authentication, atmController.list)
  router.post('/atm', authentication, atmController.create)
  router.delete('/atm/:id', authentication, atmController.delete)
  router.put('/atm/:id', authentication, atmController.update)

  app.use('/api/v1', router)
}
