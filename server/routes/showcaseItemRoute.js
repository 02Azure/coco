const express = require('express')
const ShowcaseItemController = require('../controllers/showcaseItemController')
const router = express.Router()

router.post("/", ShowcaseItemController.create) // add one showcase item to the current showcase id

router.patch("/:id", ShowcaseItemController.switchStarredStatus) //switch starred status of the showcaseitem
router.delete("/:id", ShowcaseItemController.delete) //remove  a showcase item

module.exports = router