const uniqid = require("uniqid")
const md5 = require("md5")

const getRandomHash = () => md5(uniqid())

module.exports = {
    getRandomHash
}