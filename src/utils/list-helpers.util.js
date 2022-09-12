const findInList = (_id, list) => list.filter(item => item.id === _id)

const getMatchingObjectIndex = (key, matchingString, list) => {
    list.findIndex((item) => item[key] === matchingString)
}

module.exports = {
    findInList,
    getMatchingObjectIndex
}