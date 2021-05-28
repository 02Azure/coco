const express = require('express')
const router = express.Router()
const wishlistController = require("../controllers/wishlistController")

router.get("/", wishlistController.getAll)
router.post("/", wishlistController.create)

router.get("/:id", wishlistController.getOne)
router.put("/:id", wishlistController.update)
router.patch("/:id", wishlistController.switchStarredStatus)
router.delete("/:id", wishlistController.delete)

module.exports = router