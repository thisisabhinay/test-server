const listHelpers = require("../utils/list-helpers.util")
const cryptoHelpers = require("../utils/crypto-helpers.util")
const projects = require("../../db/projects.json")
const results = require("../services/results.service")
const fileSys = require("fs")

const getAllProjects = async () => {
    return projects
}

const getProjectById = async (id) => {
    console.log(id)
    console.log(listHelpers.findInList(id, projects))
    return listHelpers.findInList(id, projects)[0]
}

const getUpdatedProjectObj = async (id, update) => {
    let updatedProject
    const project = listHelpers.findInList(id, projects)[0]
    updatedProject = {
        ...project,
        name: update?.name,
        document: {
            ...project.document,
            usecase: update?.usecase,
            content: update?.content,
        },
    }

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

    console.log("Index", index)
    /**
     * Replaces the targeted object in the list with updated one
     */
    projects[index] = updatedProject

    console.log(updatedProject, index)
    fileSys.writeFile(
        "./db/projects.json",
        JSON.stringify(projects, null, 4),
        (error) => {
            if (error) return error
            console.log("File db/projects.json is written successfully")
        },
    )

    return updatedProject
}

const generateProjectResults = (projectId) => {
    return results.generateRandomResults().map((result) => {
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
    /**
     * Check if project with this id already exist or not
     */
    const existingIndex = listHelpers.getMatchingObjectIndex(
        keyToMatch,
        targetId,
        projects,
    )
    existingIndex ? updateProject(newProject) : projects.push(newProject)

    fileSys.writeFile(
        "./db/projects.json",
        JSON.stringify(projects, null, 4),
        (error) => {
            if (error) return error
            console.log("File db/projects.json is written successfully")
        },
    )

    console.log(projects)
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
    generateProjectResults,
}
