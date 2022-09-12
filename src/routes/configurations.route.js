const express = require("express")
const router = express.Router()
const configurationsController = require("../controllers/configurations.controller")

/**
 * GET all configurations
 */
router.get(["/"], configurationsController.getAll)

/**
 * GET given result from the list of all configurations
 */
router.get(["/:id"], configurationsController.getById)

module.exports = router