const results = require("../services/results.service")

const getAll = async (req, res, next) => {
    try {
        res.json(await results.getAllResults())
    } catch (error) {
        console.error(
            "Error while fetching all results from the DB: ",
            error.message,
        )
        next(error)
    }
}

const getById = async (req, res, next) => {
    let resultId

    try {
        resultId = req?.params?.id
        res.json(await results.getResultById(resultId))
    } catch (error) {
        console.error(
            "Error while getting fetching the result with id '%s' from the DB: %s",
            resultId,
            error.message,
        )
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
}
