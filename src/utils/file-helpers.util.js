const fileSystem = require("fs")

const writeToFile = async (filePath, data) => {
    console.log("writing file")
    await fileSystem.writeFile(
        filePath,
        JSON.stringify(data, null, 4),
        "utf-8",
        (error) => {
            if (error) return error
            console.log("File '%s' written successfully", filePath)
        },
    )

    return true
}

module.exports = {
    writeToFile,
}
