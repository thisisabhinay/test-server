/* eslint-disable no-undef */
let express = require("express")
let path = require("path")
let cors = require("cors")
let bodyParser = require("body-parser")
let port = process.env.PORT || 4000
let app = express()
let router = express.Router();

let usecases = require("./db/usecases.json")
let projects = require("./db/projects.json")
let results = require("./db/mock_ml.json")
let configs = require("./db/configs.json")

let { 
    returnListIfNoItemFound, 
    updateProjectsWithNewProject,
    updateProjectsWithPatch
} = require("./src/utils/utils.js")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
    origin: "*"
}))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
    // res.render("index");
})

app.get(["/api/v1/usecase/", "/api/v1/usecase/:id"], function (req, res) {
    const usecaseId = req?.params?.id
    res.json(returnListIfNoItemFound(usecaseId, usecases))
})

app.get(["/api/v1/project/", "/api/v1/project/:id"], function (req, res) {
    const projectId = req?.params?.id
    res.json(returnListIfNoItemFound(projectId, projects))
})

app.get(["/api/v1/result/", "/api/v1/result/:id"], function (req, res) {
    const resultId = req?.params?.id
    res.json(returnListIfNoItemFound(resultId, results))
})

app.get(["/api/v1/config/", "/api/v1/config/:usecaseId"], function (req, res) {
    const usecaseId = req?.params?.usecaseId
    if(!usecaseId) res.json(configs)
    res.json(configs[usecaseId])
})

app.post("/api/v1/project/:id", function(req, res) {
    const newProjectId = req?.params?.id
    console.log("Recieved new id - ", newProjectId)
    const updatedList = updateProjectsWithNewProject(projects, newProjectId, results, req.body)
    res.json(updatedList[updatedList.length - 1])
    res.end()
})

app.patch("/api/v1/project/:id", function(req, res) {
    const projectId = req?.params?.id
    let index = null
    let project = projects.filter((project, i) => {
        if(project.id === projectId) {
            index = i
            return true
        }

        return false
    })
    
    project = project[0]
    project = {...project, ...req?.body}
    console.log(project)
    projects[index] = project
    updateProjectsWithPatch(projects)
    res.json(project)
    res.end()
})

// Change the 404 message modifing the middleware
app.use(function(req, res) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)")
})

app.listen(port, () => {
    console.log("Server listening at: 127.0.0.1: " + port)
})

