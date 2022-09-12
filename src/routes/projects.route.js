const express = require("express")
const router = express.Router()
const projectsController = require("../controllers/projects.controller")

/**
 * GET all projects
 */
router.get(["/"], projectsController.getAll)

/**
 * GET given project from the list of all projects
 */
router.get(["/:id"], projectsController.getById)

/**
 * GET more suggestions for the given project
 */
router.get(["/:id/suggestions"], projectsController.getSuggestionsById)

/**
 * PATCH the given project with updated data 
 */
router.patch(["/:id"], projectsController.updateById)

/**
 * POST the new project in the projects list 
 */
router.post(["/:id"], projectsController.create)

module.exports = router