const findInList = (_id, list) => list.filter((item) => item.id === _id)

const getMatchingObjectIndex = (key, matchingString, list) => {
    return list.findIndex((item) => {
        return item[key] === matchingString
    })
}

module.exports = {
    findInList,
    getMatchingObjectIndex,
}
