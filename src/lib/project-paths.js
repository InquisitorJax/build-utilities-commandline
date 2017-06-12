const paths = require("path");

function project() {
    return paths.resolve(".");
}

function source(path, file) {
    return `${paths.resolve(".")}/src/${path}/${file}`;
};

function test(path, file) {
    return `${paths.resolve(".")}/test/${path}/${file}`;
};

function mockups(file) {
    return `${paths.resolve(".")}/test/mockups/${file}`;
};


module.exports = {
    source: source,
    test: test,
    mockups: mockups,
    project: project
};
