const glob = require("glob");
const babel = require("babel-core");
const babelOptions = require("./bable-options");
const fs = require("fs");
const files = require("./../files");
const path = require("path");

function compileSource() {
    return files.deleteFolder("app").then(_ => {
        transpileFiles("src/**/*.js", "amd", "app").catch(errors => console.error(errors));
        files.copyFiles("src/**/*.html", "app", true);
        files.copyFiles("src/**/*.css", "app", true);
        files.copyFiles("src/**/*.svg", "app", true);
    });
}

function compileDist() {
    return files.deleteFolder("dist").then(_ => {
        const amdPromise = transpileFiles("src/**/*.js", "amd", "dist/amd");
        files.copyFiles("src/**/*.html", "dist/amd", true);
        files.copyFiles("src/**/*.css", "dist/amd", true);
        files.copyFiles("src/**/*.svg", "dist/amd", true);

        const commonPromise = transpileFiles("src/**/*.js", "commonjs", "dist/commonjs");
        files.copyFiles("src/**/*.html", "dist/commonjs", true);
        files.copyFiles("src/**/*.css", "dist/commonjs", true);
        files.copyFiles("src/**/*.svg", "dist/commonjs", true);

        const systemPromise = transpileFiles("src/**/*.js", "systemjs", "dist/systemjs");
        files.copyFiles("src/**/*.html", "dist/systemjs", true);
        files.copyFiles("src/**/*.css", "dist/systemjs", true);
        files.copyFiles("src/**/*.svg", "dist/systemjs", true);

        Promise.all([amdPromise, commonPromise, systemPromise]).catch(errors => console.log(errors));
    })
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

module.exports = {
    compileSource: compileSource,
    compileDist: compileDist
};

/**
 *  https://www.npmjs.com/package/uglify-js
 */
