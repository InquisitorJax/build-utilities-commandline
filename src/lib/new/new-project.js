const files = require("./../files");
const paths = require("./../project-paths");

function createStandardProject() {
    const projectFolder = paths.project();

    return files.getFiles(`${pbucPath}/templates/app/standard/**/*.*`).then(result => {
       for(let file of result) {
           const target = file.replace(`${pbucPath}/templates/app/standard`, projectFolder);
           const content = files.loadFile(file);
           files.saveFile(file, content, true);
       }
    });
}

module.exports = {
    createStandardProject: createStandardProject
};