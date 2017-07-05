#!/usr/bin/env node

const program = require('commander');
const source = require('./src/lib/compile/source');
const fs = require('fs');
const newCls = require('./src/lib/new/new-class');
const newComp = require('./src/lib/new/new-component');
const newView = require('./src/lib/new/new-view');
const newProject = require('./src/lib/new/new-project');
const prompt = require('prompt');
const file = require('./src/lib/files');
const publish = require("./src/lib/publish/publish");
const path = require("path");
const add = require("./src/lib/add");
const scss = require("./src/lib/compile/scss");
const AutomationTestRunner = require("./src/lib/test/automation-test-runner");
const projectPath = require("./src/lib/project-paths");
const browserSync = require("browser-sync");

global.pbucPath = path.resolve(__dirname);
global.projectPath = path.resolve(process.cwd());

require.extensions['.tpl'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

program
    .version('0.0.1')
    .option('-n, --new <new>', 'Add new. options = (project|class|view|component)', /^(project|class|view|component)$/i, "none")
    .option('-c, --compile <compile>', 'Compile type. options = (source [amd or system or commonjs: default is amd]|dist|style|svg|all)', /^(source|dist|style|svg|all)$/i, "none")
    .option('-p, --publish', 'Publish your files as defined by publish.json in project root')
    .option('-cl, --clear', 'Delete all developer folders that are geneated during build and test processes, add "force" to force delete of locked folders')
    .option('-a, --add <add>', 'Add items to your project. options = (mockups)', /^(mockups)$/i, "none")
    .option('-t, --test', 'Test UI')
    .parse(process.argv);


const actionMap = new Map([
    ["new-class", newCls.createNewClass],
    ["new-component", newComp.createNewComponent],
    ["new-view", newView.createNewView],
    ["new-project", newProject.createProject],
    ["compile-source", source.compileSource],
    ["compile-tests", source.compileTests],
    ["compile-dist", source.compileDist ],
    ["compile-style", scss.compileScss],
    ["compile-all", compileAll],
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
    let module = null;

    if (hasArgument("amd")) {
        module = "amd";
    }
    else if (hasArgument("commonjs")) {
        module = "commonjs"
    }
    else if (hasArgument("systemjs")) {
        module = "systemjs"
    }

    const actionKey = `compile-${program.compile}`;

    if (module) {
        runWithCustomParam(actionKey, module);
    }
    else {
        run(actionKey);
    }
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
    const force = hasArgument('force');
    file.deleteFolders(["app", ".nyc_output", "coverage", "dist", "publish", "styles"], force);
}

if (hasArgument('-t') || hasArgument("--test")) {
    const url = urlArgument() || "http://localhost:8080";
    const glob = globArgument() || "**/*.json";

    const searchPath = projectPath.test("e2e", glob);

    const serverOptions = {
        port: 8080,
        open: false,
        server: {
            baseDir: './'
        },
        ui: {
            port: 8081
        }
    };


    const jsonTestsToRun = [];

    const server = browserSync.init(serverOptions, _ => {
        const runner = new AutomationTestRunner(url);

        file.getFiles(searchPath).then(result => {
            for (let f of result) {
                if (f[0] != ".") {
                    const content = file.loadFile(f);
                    const test = JSON.parse(content);
                    test.test.path = f;

                    jsonTestsToRun.push(test);
                }
            }

            runner.run(jsonTestsToRun, _ => server.exit())
        }).catch(errors => console.error(errors));
    });
}

function compileAll() {
    source.compileSource();
    scss.compileScss();
}

function urlArgument() {
    for (let arg of process.argv) {
        if (arg.indexOf("http://") > -1 || arg.indexOf("https://") > -1) {
            return arg;
        }
    }

    return null;
}

function globArgument() {
    for (let arg of process.argv) {
        if (argContains(arg, ".json")) {
            return arg;
        }

        if (argContains(arg, "*.")) {
            return arg;
        }
    }

    return null;
}

function argContains(arg, content) {
    return arg.indexOf(content) > -1;
}

function hasArgument(argument) {
    return process.argv.indexOf(argument) > -1
}

function run(actionKey, args) {
    if (actionMap.has(actionKey)) {
        let parameters = null;
        if (actionParametersMap.has(actionKey)) {
            parameters = actionParametersMap.get(actionKey);
        }

        const action = actionMap.get(actionKey);
        action.apply(this, parameters);
    }
}

function runWithCustomParam(actionKey, parameter) {
    if (actionMap.has(actionKey)) {
        const action = actionMap.get(actionKey);
        action.apply(this, [parameter]);
    }
}