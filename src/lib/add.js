const paths = require("./project-paths");
const path = require("path");
const files = require("./files");

function addMockups() {
    const target = paths.mockups("");

    files.getFiles(`${pbucPath}/mockups/*.*`)
        .then(mockups => {
            for (let file of mockups) {
                const fileName = path.basename(file);
                files.copyFile(file, `${target}${fileName}`);
            }
        })
        .catch(errors => console.error(errors));
}

module.exports = {
    addMockups: addMockups
};