const express = require('express')
const router = express.Router()
const ShowcaseController = require("../controllers/showcaseController")
const authenticate = require("../middlewares/authentication")
const authorize = require("../middlewares/authorization")

router.get("/", ShowcaseController.getAll)
router.get("/:id", ShowcaseController.getOne)

router.use(authenticate)

router.post("/", ShowcaseController.create)

router.use("/:id", authorize)

router.patch("/:id/star", ShowcaseController.switchStarredStatus)
router.patch("/:id", ShowcaseController.editName)
router.delete("/:id", ShowcaseController.delete)

module.exports = router