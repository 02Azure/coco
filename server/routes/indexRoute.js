const express = require('express')
const showcases = require("./showcaseRoute")
const wishlist = require("./wishlistRoute")
const users = require('./usersRoute')
const items = require('./itemsRoute')
const router = express.Router()

router.use("/showcases", showcases)
router.use("/wishlist", wishlist)
router.use("/users", users)
router.use("/items", items)

module.exports = router