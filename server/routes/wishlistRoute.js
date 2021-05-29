const express = require('express')
const router = express.Router()
const WishlistController = require("../controllers/wishlistController")
const authenticate = require("../middlewares/authentication")
const authorize = require("../middlewares/authorization")

router.get("/", WishlistController.getAll)
router.get("/:id", WishlistController.getOne)

router.use(authenticate)

router.post("/", WishlistController.create)

router.use("/:id", authorize)

router.put("/:id", WishlistController.update)
router.delete("/:id", WishlistController.delete)

module.exports = router