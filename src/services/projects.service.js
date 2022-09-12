const listHelpers = require("../utils/list-helpers.util")
const fileHelpers = require("../utils/file-helpers.util")
const cryptoHelpers = require("../utils/crypto-helpers.util")
const projects = require("../../db/projects.json")
const results = require("../services/results.service")

const getAllProjects = async () => {
    return projects
}

const getProjectById = async (id) => {
    return listHelpers.findInList(id, projects)[0]
}

const getUpdatedProjectObj = async (id, update) => {
    let updatedProject
    const project = listHelpers.findInList(id, projects)[0]
    updatedProject = { ...project, ...update }

    console.log(updatedProject)
    return updatedProject
}

const updateProject = async (updatedProject) => {
    const targetId = updatedProject.id
    const keyToMatch = "id"
    const index = listHelpers.getMatchingObjectIndex(
        keyToMatch,
        targetId,
        projects,
    )

    /**
     * Replaces the targeted object in the list with updated one
     */
    projects[index] = updatedProject

    await fileHelpers.writeToFile(
        "../../db/projects.json",
        JSON.stringify(projects, null, 4),
    )

    return updatedProject
}

const generateProjectResults = (projectId) => {
    return results
        .generateRandomResults()
        .map((result) => {
            result.projectId = projectId
            return result
        })
}

const createNewProject = async (props) => {
    const newProject = createEmptyProject()
    const targetId = props.id
    const keyToMatch = "id"
    newProject.id = props.id
    newProject.name = props.name
    newProject.url = `project/${props.id}`
    newProject.document.content = props.content
    newProject.document.results.list = generateProjectResults(props.id)
    newProject.document.usecase = {
        ...props.usecase,
        url: `/usecase/${props.usecase?.type}/${props.usecase?.type?.name
            ?.split(" ")
            .join("-")
            .toLowerCase()}/`,
    }

    console.log(newProject)
    /**
     * Check if project with this id already exist or not
     */
    const existingIndex = listHelpers.getMatchingObjectIndex(
        keyToMatch,
        targetId,
        projects,
    )

    existingIndex ? updateProject(newProject) : projects.push(newProject)
    
    await fileHelpers.writeToFile(
        "../../db/projects.json",
        JSON.stringify(projects, null, 4),
    )
    return newProject
}

const createEmptyProject = () => {
    return {
        id: "",
        name: "",
        state: null,
        status: "Inbox",
        url: "",
        createdDate: new Date(),
        lastEditdate: new Date(),
        isDeleted: false,
        document: {
            usecase: {},
            results: {
                actions: {
                    favorite: true,
                    copy: true,
                    delete: true,
                    flag: true,
                },
                list: "",
            },
            history: {},
            content: "",
        },
        organization: {
            id: cryptoHelpers.getRandomHash(),
            name: "Abhinay's Org",
        },
        team: {
            id: cryptoHelpers.getRandomHash(),
            name: "Content Writers",
        },
        product: {
            id: cryptoHelpers.getRandomHash(),
            name: "Content Studio",
        },
        creator: {
            user_id: cryptoHelpers.getRandomHash(),
            name: "Abhinay Thakur",
        },
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    getUpdatedProjectObj,
    updateProject,
    createNewProject,
}
