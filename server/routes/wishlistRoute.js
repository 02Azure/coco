const express = require('express')
const router = express.Router()
const WishlistController = require("../controllers/wishlistController")

router.get("/", WishlistController.getAll)
router.post("/", WishlistController.create)

router.get("/:id", WishlistController.getOne)

//authorization
router.put("/:id", WishlistController.update)
router.patch("/:id", WishlistController.switchStarredStatus)
router.delete("/:id", WishlistController.delete)

module.exports = router