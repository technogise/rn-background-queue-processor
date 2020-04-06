module.exports = {
  root: true,
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": ["react", "jsx-a11y", "import"],
  "rules": {
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    "react/jsx-filename-extension": ["off"],
    "linebreak-style": ["off"],
    "no-undef": ["error"],
    "react/sort-comp": ["off"],
    "react/prefer-stateless-function": ["off"],
    "react/destructuring-assignment": ["off"],
    "react/prop-types": ["off"],
    "import/prefer-default-export": ["off"],
    "class-methods-use-this": ["off"],
    "react/no-access-state-in-setstate": ["off"],
    "react/no-array-index-key": ["off"],
  },
  "globals": {
    "it": true,
    "expect": true,
    "describe": true,
    "navigator": true,
    "fetch": true,
    "jest": true,
    "test": true,
  }
};
