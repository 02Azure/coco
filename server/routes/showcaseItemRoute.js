const express = require('express')
const ShowcaseItemController = require('../controllers/showcaseItemController')
const router = express.Router()
const authenticate = require("../middlewares/authentication")
const authorize = require("../middlewares/authorization")

router.get("/", ShowcaseItemController.getAll) //get all showcased Items

router.use(authenticate)

router.post("/", ShowcaseItemController.create) // add one showcase item to the current showcase id

router.use("/:id", authorize)

router.patch("/:id", ShowcaseItemController.switchStarredStatus) //switch starred status of the showcaseitem
router.delete("/:id", ShowcaseItemController.delete) //remove  a showcase item

module.exports = router