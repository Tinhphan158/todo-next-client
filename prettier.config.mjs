/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  arrowParens: "always",
  jsxSingleQuote: false,
  bracketSameLine: false,
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  experimentalTernaries: false,
  quoteProps: "as-needed",
  proseWrap: "always",
  htmlWhitespaceSensitivity: "css",
  embeddedLanguageFormatting: "auto",
  useTabs: false,
  requirePragma: false,
  insertPragma: false,
  vueIndentScriptAndStyle: false,
  singleAttributePerLine: false,
};

export default config;
