module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": 2020,
    "sourceType": "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "react-hooks", "deprecation"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:storybook/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  rules: {
    "deprecation/deprecation": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-exports": "error",
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
      files: ["*.test.ts", "*.test.tsx", "*.stories.tsx"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
    {
      files: ["*.stories.tsx", "storybookHelpers.tsx"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: ["*Machine.ts"],
      rules: {
        "@typescript-eslint/consistent-type-imports": "off",
      },
    },
  ],
  ignorePatterns: ["ProofOfconcepts", "*.typegen.ts"],
};
