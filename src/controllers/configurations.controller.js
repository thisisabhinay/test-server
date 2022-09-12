const configurations = require("../services/configurations.service")

const getAll = async (req, res, next) => {
    try {
        res.json(await configurations.getAllConfigurations())
    } catch (error) {
        console.error(
            "Error while fetching all configurations from the DB: ",
            error.message,
        )
        next(error)
    }
}

const getById = async (req, res, next) => {
    let configurationId

    try {
        configurationId = req?.params?.id
        res.json(await configurations.getConfigurationById(configurationId))
    } catch (error) {
        console.error(
            "Error while getting fetching the configuration with id '%s' from the DB: %s",
            configurationId,
            error.message,
        )
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
}
