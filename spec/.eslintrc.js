module.exports = {
    "env": {
        "jasmine": true
    },
    "plugins": ['jasmine'],
    "extends": 'plugin:jasmine/recommended',
    "rules": {
        "jasmine/no-spec-dupes": [1, "branch"]
    }
};
