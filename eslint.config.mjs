import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import security from "eslint-plugin-security";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        ecmaVersion: "latest"
      }
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      security: security,
    },
    rules: {
      // 💡 Prettier Rules
      "prettier/prettier": "error",

      // 💡 Import Sorting & Unused Imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { "vars": "all", "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],

      // 💡 Import Best Practices
      "import/order": ["error", { "alphabetize": { "order": "asc", "caseInsensitive": true } }],
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/prefer-default-export": "off",
      "import/extensions": "off",

      // 💡 Security Best Practices
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-fs-filename": "warn",

      // 💡 TypeScript Best Practices
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "ignoreRestSiblings": true }],
      "@typescript-eslint/explicit-function-return-type": ["warn", { "allowExpressions": true }],
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/no-useless-constructor": ["error"],

      // 🔥 Extra Spaces & New Line Rules
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }], // Prevent multiple empty lines
      "no-trailing-spaces": "error", // Prevent spaces at the end of lines
      "spaced-comment": ["error", "always", { "markers": ["/"] }], // Enforce spacing in comments
      "no-irregular-whitespace": "error", // Disallow irregular spaces that cause issues

      // 💡 Code Quality
      "no-useless-constructor": "off",
      "lines-between-class-members": "off",
      "no-shadow": "off",
      "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "no-non-null-assertion": "off",
      "no-empty-function": "off",
      "no-console": ["error"],
    },
  },
];