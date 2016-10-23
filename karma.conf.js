module.exports = function (config) {
    config.set({
        preprocessors: {
            'lib/**/*.js': ['babel'],
            'specs/**/*.js': ['babel']
        },
        babelPreprocessor: {
            options: {
                // presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        }
    });
};