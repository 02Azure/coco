const express = require('express')
const showcases = require("./showcaseRoute")
const wishlist = require("./wishlistRoute")
const router = express.Router()

router.use("/showcases", showcases)
router.use("/wishlist", wishlist)

module.exports = router