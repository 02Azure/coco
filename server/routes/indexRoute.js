const express = require('express')
const showcases = require("./showcaseRoute")
const wishlist = require("./wishlistRoute")
const users = require('./usersRoute')
const items = require('./itemsRoute')
const showcaseItems = require("./showcaseItemRoute")
const router = express.Router()

router.use("/showcases", showcases)
router.use("/wishlist", wishlist)
router.use("/users", users)
router.use("/items", items)
router.use("/showcaseitems", showcaseItems)

module.exports = router