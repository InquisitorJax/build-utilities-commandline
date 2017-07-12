const paths = require("path");

function project() {
    return projectPath;
}

function e2eResultsPath(file) {
    return `${projectPath}/coverage/e2e_results/${file}`;
}

function source(path, file) {
    return `${projectPath}/src/${path}/${file}`;
};

function test(path, file) {
    return `${projectPath}/test/${path}/${file}`;
};

function styles(path, file) {
    return `${projectPath}/scss/${path}/${file}`;
}

function mockups(file) {
    return `${projectPath}/test/mockups/${file}`;
};


module.exports = {
    source: source,
    test: test,
    mockups: mockups,
    project: project,
    e2eResultsPath: e2eResultsPath,
    styles: styles
};
