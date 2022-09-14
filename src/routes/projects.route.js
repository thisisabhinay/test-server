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
 * POST the new project in the projects list 
 */
router.post(["/:id"], projectsController.create)

/**
 * PATCH(s) the given project with provided properties in request body 
 */
router.get(["/:id/suggestions"], projectsController.fetchUpdateSuggestionsById)
router.patch(["/:id/usecase"], projectsController.updateUsecaseById)
router.patch(["/:id/name"], projectsController.updateNameById)
router.patch(["/:id/status"], projectsController.updateStatusById)
router.patch(["/:id/content"], projectsController.updateContentById)

module.exports = router