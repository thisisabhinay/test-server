const express = require("express")
const router = express.Router()
const resultsController = require("../controllers/results.controller")

/**
 * GET all results
 */
router.get(["/"], resultsController.getAll)

/**
 * GET given result from the list of all results
 */
router.get(["/:id"], resultsController.getById)

module.exports = router