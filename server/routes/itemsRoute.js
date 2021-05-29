const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

router.use(authenticate)
router.get("/", itemController.getItems)
router.get("/:id", itemController.getItemById)
router.use("/:id", authorize)
router.post("/", itemController.postItem)
router.put("/:id", itemController.putItem)
router.patch("/:id", itemController.patchItem)
router.delete("/:id", itemController.deleteItem)

module.exports = router
