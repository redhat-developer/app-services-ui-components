module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
    "prettier",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: ".",
            message:
              "Please import sibling components explictly to avoid cyclic dependencies",
          },
          {
            name: "./",
            message:
              "Please import sibling components explictly to avoid cyclic dependencies",
          },
          {
            name: "dayjs",
            message: "Please use date-fns instead",
          },
          {
            name: "date-fns",
            importNames: ["format"],
            message:
              "Please use format or formatInTimeZone from date-fns-tz instead",
          },
        ],
        patterns: [
          {
            group: ["@patternfly/react-icons/dist/*"],
            message:
              "Please use the ESM import of the icon, eg. `import { TimesIcon } from '@patternfly/react-icons' instead of `import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';`",
          },
          {
            group: ["@patternfly/react-tokens/dist/*"],
            message: "Please use the ESM import",
          },
          {
            group: ["date-fns/*"],
            message: "Please use the ESM import",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
  ignorePatterns: ["ProofOfconcepts", "*.typegen.ts"],
};
