module.exports = function(modules) {
    return {
        sourceMaps: "inline",
        comments: false,
        compact: false,
        code: true,
        presets: [
            'es2017',
            ['es2015', { loose: true, modules: modules }]
        ],
        plugins: [
            "transform-decorators-legacy",
            "transform-class-properties"
        ]
    };
};

