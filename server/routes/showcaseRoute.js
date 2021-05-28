const express = require('express')
const router = express.Router()
const ShowcaseController = require("../controllers/showcaseController")

router.get("/", ShowcaseController.getAll)
router.post("/", ShowcaseController.create)

router.get("/:id", ShowcaseController.getOne)
router.patch("/:id", ShowcaseController.editName)
router.delete("/:id", ShowcaseController.delete)

module.exports = router