const populateTemplate = require("./../populate-template");
const paths = require("./../project-paths");
const newHelpers = require("./new-helpers");
const schema = require("./../schemas");
const files = require("./../files");

function createNewClass(prompt, saveFile) {
    prompt.start();
    return prompt.get(schema.component, (error, result) => {
        const className = newHelpers.createClassName(result.name);
        const classFileName = `${newHelpers.createFileName(result.name)}.js`;

        saveFile(paths.source(result.path, classFileName), getClassTemplate(className));
        saveFile(paths.test(result.path, classFileName), getClassTestTemplate(className, result.path, classFileName));
    });
}

function getClassTemplate(className) {
    const classTemplate = files.loadFile("templates/new/class/class.js.tpl");
    return populateTemplate(classTemplate, {
        "__classname__": className
    });
}

function getClassTestTemplate(className, path, classFileName) {
    const classTestTemplate = files.loadFile("templates/new/class/class.test.js.tpl");
    return populateTemplate(classTestTemplate, {
        "__classname__": className,
        "__classpath__": path,
        "__classfilename__": classFileName
    });
}

module.exports = {
    createNewClass: createNewClass
};