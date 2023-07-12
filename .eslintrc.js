module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
  "ignorePatterns": ["**/*.test.*", "src/__mocks__/*" ],
    "rules": {
      "react/prop-types": 0,
      "react/display-name": 0,
      "@typescript-eslint/no-empty-function": ["error", { "allow": ["arrowFunctions"] }],
      "@typescript-eslint/ban-types": [
        "error",
        {
          "types": {
            // un-ban a type that's banned by default
            "Function": false
          },
          "extendDefaults": true
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          "argsIgnorePattern": "^_",
        }
      ],

    }
}
