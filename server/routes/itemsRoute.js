const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')

router.get("/", itemController.getItems)
router.post("/", itemController.postItem)

router.get("/:id", itemController.getItemById)
router.put("/:id", itemController.putItem)
router.patch("/:id", itemController.patchItem)
router.delete("/:id", itemController.deleteItem)

module.exports = router
