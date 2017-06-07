#!/usr/bin/env node

const program = require('commander');
const source = require('./src/lib/compile/source');
const fs = require('fs');
const newCls = require('./src/lib/new/new-class');
const newComp = require('./src/lib/new/new-component');
const newView = require('./src/lib/new/new-view');
const prompt = require('prompt');
const file = require('./src/lib/files');
const publish = require("./src/lib/publish/publish");
const path = require("path");
const add = require("./src/lib/add");

global.pbucPath = path.resolve(__dirname);
// console.log(pbucPath);

require.extensions['.tpl'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

program
    .version('0.0.1')
    .option('-n, --new <new>', 'Add new. options = (project|class|view|component)', /^(project|class|view|component)$/i, "none")
    .option('-c, --compile <compile>', 'Compile type. options = (source|dist|style|svg|all)', /^(source|dist|style|svg|all)$/i, "none")
    .option('-p, --publish', 'Publish your files as defined by publish.json in project root')
    .option('-cl, --clear', 'Delete all developer folders that are geneated during build and test processes, add "--force" to force delete of locked folders')
    .option('-a, --add <add>', 'Add items to your project. options = (mockups)', /^(mockups)$/i, "none")
    .parse(process.argv);


const actionMap = new Map([
    ["new-class", newCls.createNewClass],
    ["new-component", newComp.createNewComponent],
    ["new-view", newView.createNewView],
    ["compile-source", source.compileSource],
    ["compile-tests", source.compileTests],
    ["compile-dist", source.compileDist ],
    ["publish", publish.publish],
    ["add-mockups", add.addMockups]
]);

const actionParametersMap = new Map([
    ["new-class", [prompt, file.saveFile]],
    ["new-component", [prompt, file.saveFile]],
    ["new-view", [prompt, file.saveFile]]
]);

if (program.new !== "none") {
    run(`new-${program.new}`)
}

if (program.compile !== "none") {
    run(`compile-${program.compile}`);
}

if (program.test !== "none") {
    run(`test-${program.test}`);
}

if (program.add !== "none") {
    run('add-mockups');
}

if (hasArgument('-p') || hasArgument("--publish")) {
    source.compileDist().then(_ => run('publish'));
}

if (hasArgument('-cl') || hasArgument("--clear")) {
    const force = hasArgument('--force');
    file.deleteFolders(["app", ".nyc_output", "coverage", "dist", "publish"], force);
}

function hasArgument(argument) {
    return process.argv.indexOf(argument) > -1
}

function run(actionKey) {
    if (actionMap.has(actionKey)) {
        let parameters = null;
        if (actionParametersMap.has(actionKey)) {
            parameters = actionParametersMap.get(actionKey);
        }

        const action = actionMap.get(actionKey);
        action.apply(this, parameters);
    }
}