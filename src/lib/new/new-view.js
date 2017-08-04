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
                createEmpty(className, tagName, path, saveFile);
            }
            else if (firstItem === "l") {
                createList(className, tagName, path, saveFile);
            }
            else if (firstItem === "c") {
                createCrud(className, tagName, path, saveFile);
            }
            else if (firstItem === "m") {
                createMd(className, tagName, path, saveFile);
            }
        }
        else {
            console.error(`option should be one of these, 'empty', 'e', 'list', 'l', 'crud', 'c', 'master-detail',  'm'`);
        }
    });
}

function createEmpty(className, tagName, path, saveFile) {
    saveFile(paths.source(path, `${tagName}.js`), getViewTemplate(className, tagName, 'view.js.tpl'));
    saveFile(paths.source(path, `${tagName}.html`), getViewHTMLTemplate('view.html.tpl', tagName));
    saveFile(paths.test(path, `${tagName}.js`), getViewTestTemplate(className, tagName));
}

function createList(className, tagName, path, saveFile) {
    saveFile(paths.source(path, `${tagName}.js`), getViewTemplate(className, tagName, 'list.js.tpl'));
    saveFile(paths.source(path, `${tagName}.html`), getViewHTMLTemplate('list.html.tpl', tagName));
    saveFile(paths.test(path, `${tagName}.js`), getViewTestTemplate(className, tagName));

    files.copyFile(`${pbucPath}/templates/new/views/toolbar-items.js.tpl`, paths.source(path, 'toolbar-items.js'));
    files.copyFile(`${pbucPath}/templates/new/views/list.scss.tpl`, paths.styles('views', `${tagName}.scss`));
}

function createCrud(className, tagName, path, saveFile) {
    saveFile(paths.source(path, `${tagName}.js`), getViewTemplate(className, tagName, 'detail.js.tpl'));
    saveFile(paths.source(path, `${tagName}.html`), getViewHTMLTemplate('detail.html.tpl', tagName));
    saveFile(paths.test(path, `${tagName}.js`), getViewTestTemplate(className, tagName));

    files.copyFile(`${pbucPath}/templates/new/views/toolbar-items.js.tpl`, paths.source(path, 'toolbar-items.js'));
    files.copyFile(`${pbucPath}/templates/new/views/model.js.tpl`, paths.source(path, 'model.js'));
    files.copyFile(`${pbucPath}/templates/new/views/schema.js.tpl`, paths.source(path, 'schema.js'));
}

function createMd(className, tagName, path, saveFile) {
    saveFile(paths.source(path, `${tagName}.js`), getViewTemplate(className, tagName, 'md.js.tpl'));
    saveFile(paths.source(path, `${tagName}.html`), getViewHTMLTemplate('md.html.tpl', tagName));
    saveFile(paths.test(path, `${tagName}.js`), getViewTestTemplate(className, tagName));

    files.copyFile(`${pbucPath}/templates/new/views/toolbar-items.js.tpl`, paths.source(path, 'toolbar-items.js'));
    files.copyFile(`${pbucPath}/templates/new/views/model.js.tpl`, paths.source(path, 'model.js'));
    files.copyFile(`${pbucPath}/templates/new/views/schema.js.tpl`, paths.source(path, 'schema.js'));
}

function getViewTemplate(className, tagName, file) {
    const classTemplate = files.loadFile(`${pbucPath}/templates/new/views/${file}`);
    return populateTemplate(classTemplate, {
        '__classname__': className,
        '__view-tag__': tagName
    });
}

function getViewHTMLTemplate(file, tagName) {
    const template = files.loadFile(`${pbucPath}/templates/new/views/${file}`);
    return populateTemplate(template, {
        '__view-tag__': tagName
    })
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