const listHelpers = require("../utils/list-helpers.util")
const usecases = require("../../db/usecases.json")

const getAllUsecases = async () => {
    return usecases
}

const getUsecaseById = async (id) => {
    return listHelpers.findInList(id, usecases)
}

module.exports = {
    getAllUsecases,
    getUsecaseById 
}