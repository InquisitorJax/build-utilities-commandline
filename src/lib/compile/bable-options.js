module.exports = function(modules) {
    return {
        sourceMaps: true,
        comments: false,
        compact: false,
        code: true,
        presets: [
            ['es2015', { loose: true, modules: modules }]
        ],
        plugins: [
            "transform-decorators-legacy",
            "transform-class-properties"
        ]
    };
};

