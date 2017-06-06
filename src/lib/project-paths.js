const paths = require("path");

function source(path, file) {
    return `${paths.resolve(".")}/src/${path}/${file}`;
};

function test(path, file) {
    return `${paths.resolve(".")}/test/${path}/${file}`;
};

module.exports = {
    source: source,
    test: test
};
