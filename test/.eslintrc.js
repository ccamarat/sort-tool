module.exports = {
    "env": {
        "mocha": true
    },
    "plugins": ['mocha'],
    "extends": 'plugin:mocha/recommended',
    "rules": {
        "mocha/no-identical-title": [1, "branch"],
        "import/no-extraneous-dependencies": 0
    }
};
