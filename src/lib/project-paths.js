const paths = require("path");

function project() {
    return projectPath;
}

function source(path, file) {
    return `${projectPath}/src/${path}/${file}`;
};

function test(path, file) {
    return `${projectPath}/test/${path}/${file}`;
};

function mockups(file) {
    return `${projectPath}/test/mockups/${file}`;
};


module.exports = {
    source: source,
    test: test,
    mockups: mockups,
    project: project
};
