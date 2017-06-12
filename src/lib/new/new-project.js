const files = require("./../files");
const path = require("path");
const paths = require("./../project-paths");

function createStandardProject() {
    const projectFolder = paths.project();
    const targetFolder = path.resolve(`${pbucPath}/templates/app/standard`);

    return files.getFiles(`${targetFolder}/**/*.*`).then(result => {
       for(let file of result) {
           const target = path.resolve(file).replace(targetFolder, projectFolder);
           const content = files.loadFile(file);
           files.saveFile(target, content, true);
       }
    }).catch(errors => console.error(errors));
}

module.exports = {
    createStandardProject: createStandardProject
};