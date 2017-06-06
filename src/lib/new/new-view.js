const populateTemplate = require("./../populate-template");
const paths = require("./../project-paths");
const newHelpers = require("./new-helpers");
const schema = require("./../schemas");
const files = require("./../files");

function createNewView(prompt, saveFile) {
    prompt.start();
    prompt.get(schema.named, (error, result) => {
        const className = newHelpers.createClassName(result.name);
        const tagName = newHelpers.createFileName(result.name);
        const path = `views/${tagName}`;

        saveFile(paths.source(path, `${tagName}.js`), getViewTemplate(className, tagName));
        saveFile(paths.source(path, `${tagName}.html`), getViewHTMLTemplate());
        saveFile(paths.test(path, `${tagName}.js`), getViewTestTemplate(className, tagName));
    });
}

function getViewTemplate(className, tagName) {
    const classTemplate = files.loadFile("templates/new/views/view.js.tpl");
    return populateTemplate(classTemplate, {
        "__classname__": className,
        "__view-tag__": tagName
    });
}

function getViewHTMLTemplate() {
    return files.loadFile("templates/new/views/view.html.tpl");
}

function getViewTestTemplate(className, tagName) {
    const classTemplate = files.loadFile("templates/new/views/view.test.js.tpl");
    return populateTemplate(classTemplate, {
        "__classname__": className,
        "__view-tag__": tagName
    });
}

module.exports = {
    createNewView: createNewView
};