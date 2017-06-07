const babelPluginIstanbul = require('babel-plugin-istanbul');

module.exports = function(modules) {
    return {
        sourceMap: true,
        moduleIds: false,
        comments: false,
        compact: false,
        code: true,
        presets: [['latest', { loose: true, modules: modules }]]
    };
};

