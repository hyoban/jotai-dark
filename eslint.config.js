import process from "node:process"
import ts from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import eslintConfigPrettier from "eslint-config-prettier"
import unicorn from "eslint-plugin-unicorn"

const files = ["src/**/*.ts"]
const languageOptions = {
  parser: tsParser,
  parserOptions: {
    project: true,
    tsconfigRootDir: process.cwd(),
  },
}
const linterOptions = {
  reportUnusedDisableDirectives: true,
}
const plugins = {
  "@typescript-eslint": ts,
  unicorn,
}

export default [
  // don't lint js files
  {
    ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"],
  },
  {
    files,
    languageOptions,
    linterOptions,
    plugins,
    rules: {
      ...ts.configs["eslint-recommended"].overrides[0].rules,
      ...ts.configs["strict-type-checked"].rules,
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",

      ...unicorn.configs.recommended.rules,
      "unicorn/prevent-abbreviations": "off",

      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  // disable formatting rules, make sure to put this last
  eslintConfigPrettier,
]
