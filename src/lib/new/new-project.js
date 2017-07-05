const files = require("./../files");
const path = require("path");
const paths = require("./../project-paths");
const prompt = require('prompt');
const schema = require("./../schemas");

function createStandardProject() {
    const targetFolder = path.resolve(`${pbucPath}/templates/app/standard`);

    return files.getFiles(`${targetFolder}/**/*.*`).then(result => {
        copyFilesOver(result, targetFolder)
    }).catch(errors => console.error(errors));
}

function createElectronProject() {
    const targetFolder = path.resolve(`${pbucPath}/templates/app/electron`);

    return files.getFiles(`${targetFolder}/**/*.*`).then(result => {
        copyFilesOver(result, targetFolder)
    }).catch(errors => console.error(errors));
}

function copyFilesOver(filesToCopy, targetFolder) {
    for(let file of filesToCopy) {
        const target = path.resolve(file).replace(targetFolder, paths.project());
        const content = files.loadFile(file);
        files.saveFile(target, content, true);
    }
}

function createProject() {
    prompt.start();
    return prompt.get(schema.project, (error, result) => {
        const options = ["web", "w", "electron", "e"];
        const projectType = result["project-type"];

        if (options.indexOf(projectType) > -1) {
            if (projectType[0].toLowerCase() === "w") {
                createStandardProject();
            }
            else if (projectType[0].toLowerCase() === "e") {
                createElectronProject();
            }
        }
        else {
            console.error("option should be one of these, 'web', 'w', 'electron', 'e'");
        }
    });
}

module.exports = {
    createProject: createProject
};