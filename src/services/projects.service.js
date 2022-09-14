const listHelpers = require("../utils/list-helpers.util")
const objectHelpers = require("../utils/object-helpers.util")
const cryptoHelpers = require("../utils/crypto-helpers.util")
const projects = require("../../db/projects.json")
const results = require("../services/results.service")
const fileSys = require("fs")

const getAllProjects = async () => {
    return projects
}

const getProjectById = async (id) => {
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

const getUpdatedProjectWithProp = async (id, key, value) => {
    let updatedProject
    const props = key.split(".")
    const project = listHelpers.findInList(id, projects)[0]
    updatedProject = objectHelpers.setNestedProp(project, props, value)

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

const getFilledProjectObj = async (props) => {
    const newProject = createEmptyProject()
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

    return newProject
}


const createNewProject = async (props) => {
    const newProject = await getFilledProjectObj(props)
    /**
     * Get list of all project and then append this new project 
     * into the list, and write this updated list to .json file.
     */
    projects.push(newProject)

    console.log("New Project -> ", newProject)

    fileSys.writeFile(
        "./db/projects.json",
        JSON.stringify(projects, null, 4),
        (error) => {
            if (error) return error
            console.log("New project (name: %s) is added to db/projects.json successfully", newProject?.name)
        },
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
    generateProjectResults,
    getUpdatedProjectWithProp,
    getFilledProjectObj
}
