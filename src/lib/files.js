const glob = require("glob");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const del = require("del");

function getFiles(query) {
    return new Promise((resolve, reject) => {
        const options = {
        };

        glob(query, options, (error, files) => {
            if (error) {
                console.error(error);
                reject(error);
            }

            resolve(files);
        });
    });
}

function saveFile(file, content) {
    mkdirp.sync(path.dirname(file));
    fs.writeFileSync(file, content, {encoding: 'utf8'});

    console.log(`file saved: ${file}`);
};

function loadFile(file) {
    const fileToLoad = path.resolve(".", file);
    return fs.readFileSync(fileToLoad, {encoding: 'utf8'});
};

function deleteFolders(folders, force) {
    const promises = [];

    for (let folder of folders) {
        promises.push(deleteFolder(folder));
    }

    return Promise.all(promises).catch(errors => console.error(errors));
}

function deleteFolder(folder, force) {
    return new Promise(resolve => {
        const folderPath = path.resolve(".", folder);

        const options = {force: force | false};
        del.sync([folder], options);

        resolve();
    });
}

module.exports = {
    getFiles: getFiles,
    saveFile: saveFile,
    loadFile: loadFile,
    deleteFolder: deleteFolder,
    deleteFolders: deleteFolders
};