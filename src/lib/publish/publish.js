const files = require("./../files");

function publish() {
    const publishJson = files.loadFile("publish.json");
    const source = JSON.parse(publishJson).source;

    files.deleteFolder("publish").then(_ => publishSource(source)).catch(error => console.error(error));
}

function publishSource(source)
{
    for(let item of source) {
        const src = item.source;
        const trg = item.target;

        copySourceToTarget(src, trg);
    }
}

function copySourceToTarget(source, target) {
    return files.getFiles(source).then(resultFiles => {
        for(let file of resultFiles) {
            const targetFile = `${target}/${file.split("dist/")[1]}`;
            const content = files.loadFile(file);
            files.saveFile(targetFile, content);
        }
    }).catch(error => console.error(error));
}

module.exports = {
    publish: publish
};