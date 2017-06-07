const scss = require("node-sass");
const files = require("./../files");
const path = require("path");

function compileScss() {
console.log("scss");
    files.getFiles("scss/*.scss").then(result => {
        for(let file of result) {
            const outputfile = `${path.resolve(".")}/styles/${path.basename(file).split(".")[0]}.css`;

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

                files.saveFile(outputfile, result.css, true);
            });
        }
    }).catch(errors => console.error(errors));
}

module.exports = {
    compileScss: compileScss
};