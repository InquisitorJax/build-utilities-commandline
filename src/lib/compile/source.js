const glob = require("glob");
const babel = require("babel-core");
const babelOptions = require("./bable-options");
const fs = require("fs");
const files = require("./../files");
const path = require("path");
const bundle = require("aurelia-bundler").bundle;

function compileSource(module) {
    const targetModule = module || "amd";
    return files.deleteFolder("app").then(_ => {
        transpileFiles("src/**/*.js", targetModule, "app").catch(errors => console.error(errors));
        files.copyFiles("src/**/*.html", "app", true);
        files.copyFiles("src/**/*.css", "app", true);
        files.copyFiles("src/**/*.svg", "app", true);
        bundelVendors();
    });
}

function compileDist() {
    const promises = [];
    return files.deleteFolder("dist").then(_ => {
        promises.push(transpileFiles("src/**/*.js", "amd", "dist/amd"));
        files.copyFiles("src/**/*.html", "dist/amd", true);
        files.copyFiles("src/**/*.css", "dist/amd", true);
        files.copyFiles("src/**/*.svg", "dist/amd", true);

        promises.push(transpileFiles("src/**/*.js", "commonjs", "dist/commonjs"));
        files.copyFiles("src/**/*.html", "dist/commonjs", true);
        files.copyFiles("src/**/*.css", "dist/commonjs", true);
        files.copyFiles("src/**/*.svg", "dist/commonjs", true);

        promises.push(transpileFiles("src/**/*.js", "systemjs", "dist/systemjs"));
        files.copyFiles("src/**/*.html", "dist/systemjs", true);
        files.copyFiles("src/**/*.css", "dist/systemjs", true);
        files.copyFiles("src/**/*.svg", "dist/systemjs", true);
    }).then(_ => Promise.all(promises).catch(errors => console.log(errors)))
}

function transpileFiles(query, modules, targetFolder) {
    return files.getFiles(query).then(files => {
        for(let file of files) {
            const target = `${targetFolder}/${file}`;
            transpileFile(file, modules, target);
        }
    });
}

function transpileFile(file, module, target) {
    const fileToTranspile = path.resolve(".", file);
    const code = babel.transformFileSync(fileToTranspile, babelOptions(module)).code;
    files.saveFile(target, code, true);
}

function bundelVendors() {
    const filename = `${projectPath}/bundle.json`;

    console.log(`Looking for bundle at: ${filename}`);

    if (fs.existsSync(filename))
    {
        console.log("Bundel found, bundeling vendors");

        const text = fs.readFileSync(filename, 'utf8');
        const config = JSON.parse(text);

        return bundle(config);
    }
    else {
        console.log("Bundel not found");
    }
}

module.exports = {
    compileSource: compileSource,
    compileDist: compileDist
};

/**
 *  https://www.npmjs.com/package/uglify-js
 */
