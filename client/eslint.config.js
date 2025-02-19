import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import vitest from "eslint-plugin-vitest";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      globals: globals.browser,
      ...vitest.environments.env.globals,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    plugins: {
      "testing-library": testingLibrary,
      vitest,
      "jest-dom": jestDom,
      "react-hooks": pluginReactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error", // Flag usage of undeclared variables
      "no-use-before-define": "error", // Disallow using variables before they are defined
      "vitest/expect-expect": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-hooks/rules-of-hooks": "error", // ✅ Enforce rules of Hooks
      "react-hooks/exhaustive-deps": "warn",
    },
    overrides: [
      {
        files: [
          "**/__tests__/**/*.{js,ts,jsx,tsx}",
          "**/*.{test,spec}.{js,ts,jsx,tsx}",
        ],
        languageOptions: {
          globals: {
            describe: "readonly",
            it: "readonly",
            test: "readonly",
            expect: "readonly",
            beforeEach: "readonly",
            afterEach: "readonly",
            beforeAll: "readonly",
            afterAll: "readonly",
          },
        },
        env: {
          "vitest-globals/env": true,
        },
      },
    ],
  },
];
