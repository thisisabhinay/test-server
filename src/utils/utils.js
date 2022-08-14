const { nanoid } = require("nanoid")
const fs = require("fs")

const returnListIfNoItemFound = (_id, list) => {
    if(!_id) return list
    return list.filter(item => item.id === _id)[0] || null
}

const generateProjectUrl = (id, {type, name}) => {
    return `/usecase/${type}/${name?.split(" ").join("-").toLowerCase()}/${id}`
}

const generateUseCaseUrl = ({type, name}) => {
    return `/usecase/${type}/${name?.split(" ").join("-").toLowerCase()}/`
}

const generateProject = (newId, usecase, results) => {
    return {
        "id": newId,
        "name": `Untitled Project_${nanoid(3)}`,
        "state": null,
        "status": "Inbox",
        "url": generateProjectUrl(newId, usecase),
        "createdDate": new Date(),
        "lastEditdate": new Date(),
        "isDeleted": false,
        "usecase": {...usecase, url: generateUseCaseUrl(usecase)},
        "document": {
            "usecase_configuration": usecase.configuration
        },
        "result": {
            "actions": {
                "favorite": true,
                "copy": true,
                "delete": true,
                "flag": true
            },
            "list": attachResults(results, newId)
        },
        "organization" : {
            "id": nanoid(16),
            "name": "Abhinay's Org"
        },
        "team" : {
            "id": nanoid(16),
            "name": "Content Writers"
        },
        "product" : {
            "id": nanoid(16),
            "name": "Content Studio"
        },
        "creator": {
            "user_id": nanoid(16),
            "name": "Abhinay Thakur"
        }
    }
}

const updateProjectsWithNewProject = (list, id, results, usecase) => {
    if(!list) list = []
    const project = generateProject(id, usecase, results)
    const content = ([...list, project])

    fs.writeFile("./db/projects.json", JSON.stringify(content, null, 4), function writeJSON(err) {
        if (err) return console.log(err)
        console.log(JSON.stringify(content))
        console.log("writing to ./db/projects.json")
    })

    return content
}

const updateProjectsWithPatch = (list) => {
    if(!list) list = []
    fs.writeFile("./db/projects.json", JSON.stringify(list, null, 4), function writeJSON(err) {
        if (err) return console.log(err)
        console.log(JSON.stringify(list))
        console.log("writing to ./db/projects.json")
    })

    return list
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const attachResults = (results, projectId) => {
    const length = randomIntFromInterval(5,25)
    const doneList = {}
    const newResults = []
    for(let i = 0; i <= length; i++){
        const index = randomIntFromInterval(0,100)
        const result = results[index]
        if(doneList[index]) {
            i--   
            continue
        }
        
        doneList[index] = true
        result.projectId = projectId
        newResults.push(result)
    }

    return newResults
}

module.exports = { 
    generateProject,
    returnListIfNoItemFound,
    updateProjectsWithNewProject,
    updateProjectsWithPatch,
    attachResults
}