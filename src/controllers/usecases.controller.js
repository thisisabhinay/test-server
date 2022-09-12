const usecases = require("../services/usecases.service")

const getAll = async (req, res, next) => {
    try {
        res.json(await usecases.getAllUsecases())
    } catch (error) {
        console.error(
            "Error while fetching all usecases from the DB: ",
            error.message,
        )
        next(error)
    }
}

const getById = async (req, res, next) => {
    let usecaseId

    try {
        usecaseId = req?.params?.id
        res.json(await usecases.getUsecaseById(usecaseId))
    } catch (error) {
        console.error(
            "Error while getting fetching the usecase with id '%s' from the DB: %s",
            usecaseId,
            error.message,
        )
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
}
