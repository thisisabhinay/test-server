const configurations = require("../../db/configs.json")

const getAllConfigurations = async () => {
    return configurations
}

const getConfigurationById = async (id) => {
    return configurations[id]
}

module.exports = {
    getAllConfigurations,
    getConfigurationById 
}