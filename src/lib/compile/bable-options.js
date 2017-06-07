module.exports = function(modules) {
    return {
        sourceMaps: false,
        moduleIds: false,
        comments: false,
        compact: false,
        code: true,
        presets: [
            ['latest', { loose: true, modules: modules }]
        ],
        plugins: [
            "transform-decorators-legacy",
            "transform-class-properties"
        ]
    };
};

