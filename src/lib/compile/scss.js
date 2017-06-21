const scss = require("node-sass");
const files = require("./../files");
const path = require("path");
const fs = require("fs");

function compileScss() {
    const promises = [];
    const scssPromise = files.getFiles("scss/**/*.scss").then(result => {
        for(let file of result) {
            if (file.indexOf("/lib/") > -1) {
                continue;
            }

            let outputFile = file;
            outputFile = outputFile.replace("scss/", "styles/");
            outputFile = outputFile.replace(".scss", ".css");

            scss.render({
                file: file,
                outputStyle: "compressed"
            }, (error, result) => {
                if (error) {
                    console.log(error.status); // used to be "code" in v2x and below
                    console.log(error.column);
                    console.error(error.message);
                    console.log(error.line);
                }

                files.saveFile(outputFile, result.css, true);
            });
        }
    });

    const fontsPromise = copyFonts();
    promises.push(scssPromise);
    promises.push(fontsPromise);

    return Promise.all(promises).catch(errors => console.error(errors));
}

function copyFonts() {
    return files.getFiles("scss/fonts/**/*.*").then(result => {
        const testTarget = result[0].slice(0).replace("scss/", "styles/");

        if (!fs.existsSync(testTarget)) {
            for(let file of result) {
                let targetFile = file;
                targetFile = targetFile.replace("scss/", "styles/");

                files.saveFile(targetFile, files.loadFile(file), true);
            }
        }


    }).catch(errors => console.error(errors));
}

module.exports = {
    compileScss: compileScss
};