const fileSystem = require("fs")

const writeToFile = async (filePath, data) => {
    await fileSystem.writeFile(
        filePath,
        JSON.stringify(data, null, 4),
        (error) => {
            if (error) return error
        },
    )

    return true
}

module.exports = {
    writeToFile,
}
