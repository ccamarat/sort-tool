module.exports = {
    "extends": "airbnb",
    "plugins": [
        "import"
    ],
    "rules": {
        "linebreak-style": 0,
        "indent": [2, 4, {"SwitchCase": 1}],
        "no-shadow": 0,
        "import/prefer-default-export": 0,
        "max-len": [2, 140],
        "no-plusplus": 0,
        "no-param-reassign": 0,
        "consistent-return": 0,
        "no-use-before-define": 0 // TODO: remove this rule
    }
};