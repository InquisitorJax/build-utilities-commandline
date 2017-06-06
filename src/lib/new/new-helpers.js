function createFileName(name) {
    let result = name.replace(/([A-Z]+)/g, "-$1").replace(/^,/, "");

    if (result[0] === "-") {
        result = result.substr(1);
    }

    return result.toLowerCase();
}

function createClassName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

module.exports = {
    createFileName: createFileName,
    createClassName: createClassName
};