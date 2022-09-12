/* eslint-disable no-undef */
const express = require("express")
const path = require("path")
const cors = require("cors")
const bodyParser = require("body-parser")
const port = process.env.PORT || 4000
const app = express()

const usecasesRouter = require("./src/routes/usecases.route")
const resultsRouter = require("./src/routes/results.route")
const configurationsRouter = require("./src/routes/configurations.route")
const projectsRouter = require("./src/routes/projects.route")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
    cors({
        origin: "*",
    }),
)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
    // res.render("index");
})

app.use("/api/v1/usecase/", usecasesRouter)
app.use("/api/v1/result/", resultsRouter)
app.use("/api/v1/config/", configurationsRouter)
app.use("/api/v1/project/", projectsRouter)

// Change the 404 message modifing the middleware
app.use(function (req, res) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)")
})

app.listen(port, () => {
    console.log("Server listening at: 127.0.0.1: " + port)
})
