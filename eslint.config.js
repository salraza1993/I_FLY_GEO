module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Disable specific accessibility rules
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",

      // Best Practices
      "eqeqeq": ["error", "always"],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

      // Code Style
      "semi": ["error", "always"],
      "indent": ["error", 2, { SwitchCase: 1 }],
      "comma-dangle": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": "error",
      "space-before-blocks": "error",

      // Function Visibility (Private starts with _)
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "method",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require"
        },
        {
          selector: "method",
          modifiers: ["public"],
          format: ["camelCase"],
          leadingUnderscore: "forbid"
        }
      ],

      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // Disable accessibility rules in HTML templates
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
    },
  }
);
