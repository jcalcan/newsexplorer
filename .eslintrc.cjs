module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "airbnb-base",
    "prettier",
  ],
  ignorePatterns: [
    "dist/**/*",
    "node_modules/**/*",
    "build/**/*",
    ".eslintrc.cjs",
    "assets/**/*",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    react: { version: "18.2" },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
  },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // Allow underscore prefix for private methods/properties
    "no-underscore-dangle": [
      "error",
      {
        allow: [
          "_id",
          "_",
          "_baseUrl",
          "_APIkey",
          "_corsProxy",
          "_headers",
          "_request",
          "_checkResponse",
        ],
      },
    ],
    // Allow console.error and console.warn
    "no-console": ["warn", { allow: ["error", "warn"] }],
    // Disable import resolution errors (Vite handles this)
    "import/no-unresolved": "off",
    "import/extensions": "off",
    // Disable PropTypes (optional - many projects skip this)
    "react/prop-types": "off",
    // Allow unused vars that start with underscore
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    // Allow function hoisting
    "no-use-before-define": ["error", { functions: false }],
    // Allow expressions in certain contexts
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: true, allowTernary: true },
    ],
    // Allow shadowing in certain cases
    "no-shadow": ["error", { allow: ["token", "err", "error"] }],
    // Allow consistent return
    "consistent-return": "warn",
    // Allow class methods that don't use 'this'
    "class-methods-use-this": "warn",
    // Allow default exports preference
    "import/prefer-default-export": "warn",
    // Allow devDependencies in config files
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.config.js",
          "**/*.config.cjs",
          "**/vite.config.js",
          "**/vite.config.ts",
        ],
      },
    ],
    // Import ordering
    "import/order": "warn",
    // React hooks
    "react-hooks/exhaustive-deps": "warn",
    // Allow unescaped entities (apostrophes)
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    // Camelcase exceptions
    camelcase: ["warn", { properties: "never", ignoreDestructuring: true }],
  },
};
