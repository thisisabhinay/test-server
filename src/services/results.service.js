const listHelpers = require("../utils/list-helpers.util")
const numericalHelpers = require("../utils/numerical-helpers.utils")
const results = require("../../db/mock_ml.json")

const getAllResults = async () => {
    return results
}

const getResultById = async (id) => {
    return listHelpers.findInList(id, results)
}

const generateRandomResults = () => {
    const totalResults = numericalHelpers.randomIntBetween(5,25)
    const list = []

    while(list.length <= totalResults) {
        const index = numericalHelpers.randomIntBetween(0,100)
        const result = results[index]

        list.push(result)

    }
    return list
}

module.exports = {
    getAllResults,
    getResultById,
    generateRandomResults
}
