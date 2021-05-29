const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const authenticate = require("../middlewares/authentication")

router.post("/register", userController.register)
router.post("/login", userController.login)

router.use(authenticate)

router.put("/", userController.updateUser)

module.exports = router