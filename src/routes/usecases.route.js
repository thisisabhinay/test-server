const express = require("express")
const router = express.Router()
const usecasesController = require("../controllers/usecases.controller")

/**
 * GET all usecases
 */
router.get(["/"], usecasesController.getAll)

/**
 * GET given usecase from the list of all usecases
 */
router.get(["/:id"], usecasesController.getById)

module.exports = router