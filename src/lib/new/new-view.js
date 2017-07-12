const populateTemplate = require('./../populate-template');
const paths = require('./../project-paths');
const newHelpers = require('./new-helpers');
const schema = require('./../schemas');
const files = require('./../files');

function createNewView(prompt, saveFile) {
    prompt.start();
    prompt.get(schema.view, (error, result) => {
        const name = result.name;
        const type = result['view-type'];

        const options = ['empty', 'e', 'list', 'l', 'crud', 'c', 'master-detail',  'm'];

        const className = newHelpers.createClassName(name);
        const tagName = newHelpers.createFileName(name);
        const path = `views/${tagName}`;

        if (options.indexOf(type) > -1) {
            const firstItem = type[0].toLowerCase();

            if (firstItem === "e") {
                createEmpty(className, tagName, path);
            }
            else if (firstItem === "l") {
                createList(className, tagName, path);
            }
            else if (firstItem === "c") {
                createCrud(className, tagName, path);
            }
            else if (firstItem === "m") {
                createMd(className, tagName, path);
            }
        }
        else {
            console.error(`option should be one of these, 'empty', 'e', 'list', 'l', 'crud', 'c', 'master-detail',  'm'`);
        }
    });
}

function createEmpty(className, tagName, path) {
    saveFile(paths.source(path, `${tagName}.js`), getViewTemplate(className, tagName, 'view.js.tpl'));
    saveFile(paths.source(path, `${tagName}.html`), getViewHTMLTemplate('view.html.tpl'));
    saveFile(paths.test(path, `${tagName}.js`), getViewTestTemplate(className, tagName));
}

function createList(className, tagName, path) {
    saveFile(paths.source(path, `${tagName}.js`), getViewTemplate(className, tagName, 'list.js.tpl'));
    saveFile(paths.source(path, `${tagName}.html`), getViewHTMLTemplate('list.html.tpl'));
    saveFile(paths.test(path, `${tagName}.js`), getViewTestTemplate(className, tagName));

    files.copyFile(paths.source(path, 'toolbar-items.js'), `${pbucPath}/templates/new/views/toolbar-items.js.tpl`);
    files.copyFile(paths.styles('views', `${tagName}.scss`), `${pbucPath}/templates/new/views/list.scss.tpl`)
}

function createCrud(className, tagName, path) {
    return console.log("create Crud");
}

function createMd(className, tagName, path) {
    return console.log("create Md");
}

function getViewTemplate(className, tagName, file) {
    const classTemplate = files.loadFile(`${pbucPath}/templates/new/views/${file}`);
    return populateTemplate(classTemplate, {
        '__classname__': className,
        '__view-tag__': tagName
    });
}

function getViewHTMLTemplate(file) {
    return files.loadFile(`${pbucPath}/templates/new/views/${file}`);
}

function getViewTestTemplate(className, tagName) {
    const classTemplate = files.loadFile(`${pbucPath}/templates/new/views/view.test.js.tpl`);
    return populateTemplate(classTemplate, {
        '__classname__': className,
        '__view-tag__': tagName
    });
}

module.exports = {
    createNewView: createNewView
};