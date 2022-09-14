const projects = require("../services/projects.service")

const getAll = async (req, res, next) => {
    try {
        res.json(await projects.getAllProjects())
    } catch (error) {
        console.error(
            "Error while fetching all projects from the DB: ",
            error.message,
        )
        next(error)
    }
}

const getById = async (req, res, next) => {
    let projectId

    try {
        projectId = req?.params?.id
        res.json(await projects.getProjectById(projectId))
    } catch (error) {
        console.error(
            "Error while getting fetching the project with id '%s' from the DB: %s",
            projectId,
            error.message,
        )
        next(error)
    }
}

const create = async (req, res, next) => {
    let projectId
    try {
        projectId = req?.params?.id

        const data = req?.body
        const props = {
            id: data?.id,
            name: data?.name,
            content: data?.content,
            usecase: data?.usecase,
        }
        res.json(await projects.createNewProject(props))
    } catch (error) {
        console.error(
            "Error while creating the new project with id '%s': %s",
            projectId,
            error.message,
        )
        next(error)
    }
}

const fetchUpdateSuggestionsById = async (req, res, next) => {
    let projectId
    try {
        projectId = req?.params?.id
        const project = await projects.getProjectById(projectId)
        const newSuggestions = await projects.generateProjectResults(projectId)
        console.log("Param Id -> ", projectId)
        console.log("Project -> ", project)
        console.log("Old Count -> ", project.document.results.list?.length)
        console.log("New Count -> ", newSuggestions?.length)
        console.log(
            "Total Expected Count -> ",
            project.document.results.list?.length + newSuggestions?.length,
        )
        project.document.results.list =
            project.document.results.list.concat(newSuggestions)

        console.log(
            "Total Actual Count -> ",
            project.document.results.list?.length,
        )
        res.json(await projects.updateProject(project))
    } catch (error) {
        console.error(
            "Error while creating the new project with id '%s': %s",
            projectId,
            error.message,
        )
        next(error)
    }
}

const updateUsecaseById = async (req, res, next) => {
    let projectId
    try {
        projectId = req?.params?.id

        const data = req?.body
        const props = {
            id: data?.id,
            name: data?.name,
            content: data?.content,
            usecase: data?.usecase,
        }
        const updatedProject = await projects.createNewProject(props)
        res.json(await projects.updateProject(updatedProject))
    } catch (error) {
        console.error(
            "Error while creating the new project with id '%s': %s",
            projectId,
            error.message,
        )
        next(error)
    }
}

const updateNameById = async (req, res, next) => {
    let projectId
    try {
        projectId = req?.params?.id

        const data = req?.body
        const { id, name } = { ...data }
        const updatedProject = await projects.getUpdatedProjectWithProp(
            id,
            "name",
            name,
        )
        res.json(await projects.updateProject(updatedProject))
    } catch (error) {
        console.error(
            "Error while renaming project with id '%s': %s",
            projectId,
            error.message,
        )
        next(error)
    }
}

const updateStatusById = async (req, res, next) => {
    let projectId
    try {
        projectId = req?.params?.id

        const data = req?.body
        const props = {
            id: data?.id,
            name: data?.name,
            content: data?.content,
            usecase: data?.usecase,
        }
        const updatedProject = await projects.getUpdatedProjectWithProp(props)
        res.json(await projects.updateProject(updatedProject))
    } catch (error) {
        console.error(
            "Error while creating the new project with id '%s': %s",
            projectId,
            error.message,
        )
        next(error)
    }
}

const updateContentById = async (req, res, next) => {
    let projectId
    try {
        projectId = req?.params?.id

        const data = req?.body
        console.log("data -> ", data)
        const { id, content } = { ...data }
        const updatedProject = await projects.getUpdatedProjectWithContent(
            id,
            content,
        )
        console.log("Updated project -> ", updatedProject)
        res.json(await projects.updateProject(updatedProject))
    } catch (error) {
        console.error(
            "Error while updating the content of project with id '%s': %s",
            projectId,
            error.message,
        )
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    fetchUpdateSuggestionsById,
    updateUsecaseById,
    updateNameById,
    updateStatusById,
    updateContentById,
}
