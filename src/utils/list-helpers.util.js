const findInList = (_id, list) => list.filter(item => item.id === _id)

const getMatchingObjectIndex = (key, matchingString, list) => {
    console.log("MS", matchingString)
    console.log("key", key)
    return list.findIndex((item) => {
        console.log(item[key])
        return item[key] === matchingString
    })
}

module.exports = {
    findInList,
    getMatchingObjectIndex
}