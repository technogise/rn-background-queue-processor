module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "it": true,
        "expect": true,
        "describe": true,
        "fetch": true,
        "jest": true,
        "test": true,
    },
    "parserOptions": {
        "sourceType": "module",
    },
    "rules": {
        "prefer-destructuring": ["error", {"object": true, "array": false}],
        "react/jsx-filename-extension": ["off"],
        "linebreak-style": ["off"],
        "no-undef": ["error"],
        "import/prefer-default-export": ["off"],
        "class-methods-use-this": ["off"],
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": true,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }],
        "import/no-extraneous-dependencies": "off",
        "max-len": ["error", 120],
        "indent": ["error", 4],
        "consistent-return": "off",
        "new-cap":"off",
        "no-underscore-dangle":"off",
        "quotes" :"off",
        "comma-dangle" :"off",
        "no-console" :"off",
        "no-case-declarations":"off",
    }
};
