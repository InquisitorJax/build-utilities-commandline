const glob = require("glob");
const babel = require("babel-core");
const babelOptions = require("./bable-options");
const fs = require("fs");
const files = require("./../files");
const path = require("path");

function compileSource() {
    return transpileFiles("src/**/*.js", "amd", "app");
}

function compileDist() {
    const amdPromise = transpileFiles("src/**/*.js", "amd", "dist/amd");
    const commonPromise = transpileFiles("src/**/*.js", "commonjs", "dist/commonjs");
    const systemPromise = transpileFiles("src/**/*.js", "systemjs", "dist/systemjs");

    return Promise.all([amdPromise, commonPromise, systemPromise]).catch(errors => console.log(errors));
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
    files.saveFile(target, code, false);
}

module.exports = {
    compileSource: compileSource,
    compileDist: compileDist
};

/**
 *  https://www.npmjs.com/package/uglify-js
 */
