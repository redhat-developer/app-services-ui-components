module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    // "@patternfly/react-icons.*": "<rootDir>/__mocks__/fileMock.js",
    images$: "<rootDir>/__mocks__/imagesMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@patternfly/react-icons|@patternfly/react-tokens|@novnc|@popperjs|lodash|monaco-editor|react-monaco-editor|byte-size)",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "__mocks__",
    "setupJest.ts",
    "<rootDir>/src/ProofOfConcepts",
    "<rootDir>/src/test-utils.tsx",
    "storiesHelpers.ts",
    ".*.stories.tsx",
  ],
};
