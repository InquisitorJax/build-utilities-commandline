const populateTemplate = require("./../populate-template");
const paths = require("./../project-paths");
const newHelpers = require("./new-helpers");
const schema = require("./../schemas");
const files = require("./../files");

function createNewComponent(prompt, saveFile) {
    prompt.start();
    prompt.get(schema.named, (error, result) => {
        const className = newHelpers.createClassName(result.name);
        const tagName = newHelpers.createFileName(result.name);
        const path = `components/${tagName}`;

        saveFile(paths.source(path, `${tagName}.js`), getComponentTemplate(className, tagName));
        saveFile(paths.source(path, `${tagName}.html`), getComponentHTMLTemplate());
        saveFile(paths.test(path, `${tagName}.js`), getComponentTestTemplate(className, tagName));
    });
}

function getComponentTemplate(className, tagName) {
    const classTemplate = files.loadFile("templates/new/component/component.js.tpl");
    return populateTemplate(classTemplate, {
        "__classname__": className,
        "__control-tag__": tagName
    });
}

function getComponentHTMLTemplate() {
    return files.loadFile("templates/new/component/component.html.tpl");
}

function getComponentTestTemplate(className, tagName) {
    const classTemplate = files.loadFile("templates/new/component/component.test.js.tpl");
    return populateTemplate(classTemplate, {
        "__classname__": className,
        "__control-tag__": tagName
    });
}

module.exports = {
    createNewComponent: createNewComponent
};