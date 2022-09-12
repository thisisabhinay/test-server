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

const updateById = async(req, res, next) => {
    let projectId
    try {
        projectId = req?.params?.id

        const update = req?.body
        const updatedProject = await projects.getUpdatedProjectObj(projectId, update)
        res.json(await projects.updateProject(updatedProject))
    } catch (error) {
        console.error(
            "Error while updating the project with id '%s' in the DB: %s",
            projectId,
            error.message,
        )
        next(error)
    }
}

const create = async(req, res, next) => {
    let projectId
    try {
        projectId = req?.params?.id

        const data= req?.body
        const props = {
            id: data?.id,
            name: data?.name,
            content: data?.content,
            usecase: data?.usecase
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

const getSuggestionsById = async (req, res, next) => {
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

module.exports = {
    getAll,
    getById,
    updateById,
    create,
    getSuggestionsById
}
