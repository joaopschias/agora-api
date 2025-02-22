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
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
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

      // 💡 Security Best Practices
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-fs-filename": "warn",

      // 💡 TypeScript Best Practices
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/explicit-function-return-type": ["warn", { "allowExpressions": true }],

      // 🔥 Extra Spaces & New Line Rules
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }], // Prevent multiple empty lines
      "no-trailing-spaces": "error", // Prevent spaces at the end of lines
      "spaced-comment": ["error", "always", { "markers": ["/"] }], // Enforce spacing in comments
      "no-irregular-whitespace": "error" // Disallow irregular spaces that cause issues
    },
  },
];