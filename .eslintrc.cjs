module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    // 'plugin:perfectionist/recommended-line-length-legacy',
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "perfectionist", "@html-eslint"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "perfectionist/sort-imports": [
      "error",
      {
        type: "natural",
        order: "asc",
        internalPattern: ["components/**", "models/**", "lib/**", "routes/**"],
        groups: [
          "react",
          "type",
          ["builtin", "external"],
          "internal-type",
          "internal",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
        customGroups: {
          value: {
            react: ["react", "react-*"],
          },
          type: {
            react: ["react", "react-*"],
          },
        },
      },
    ],
  },
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
    },
  ],
};
