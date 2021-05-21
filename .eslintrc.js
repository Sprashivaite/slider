module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:fsd/all",
    "airbnb-base",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "fsd"],
  rules: { 
    "import/extensions": ["error", "never"],
    "import/no-unresolved": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
  settings: { 
  },
  globals: {
    $: true,
  }
};
