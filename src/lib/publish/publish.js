const files = require("./../files");
const path = require("path");

function publish() {
    const publishJson = files.loadFile("publish.json");
    const source = JSON.parse(publishJson).source;

    files.deleteFolder("publish").then(_ => {
        bumpVersion();
        publishSource(source);
    }).catch(error => console.error(error));
}

function publishSource(source)
{
    for(let item of source) {
        const src = item.source;
        const trg = item.target;

        copySourceToTarget(src, trg);
    }
}

function bumpVersion() {
    const sourcePackage = `${path.resolve(".")}/package.json`;
    const targetPackage = `${path.resolve(".")}/publish/package.json`;

    const content = files.loadFile(sourcePackage);
    const pkg = JSON.parse(content);
    const version = pkg.version;
    const isPre = version.indexOf("-pre") > -1;
    const preConstants = ["", "-pre"];

    const versions = version.split(".");
    versions[2] = versions[2].replace("-pre", "");
    versions[2] = Number(versions[2]) + 1;
    pkg.version = `${versions.join(".")}${preConstants[+ isPre]}`;

    files.saveFile(sourcePackage, JSON.stringify(pkg, null, 4));
    files.copyFile(sourcePackage, targetPackage);
}

function copySourceToTarget(source, target) {
    return files.getFiles(source).then(resultFiles => {
        for(let file of resultFiles) {
            const fileName = file.indexOf("dist") > -1 ? file.split("dist/")[1] : file;
            const targetFile = `${target}/${fileName}`;
            const content = files.loadFile(file);
            files.saveFile(targetFile, content);
        }
    }).catch(error => console.error(error));
}

module.exports = {
    publish: publish
};