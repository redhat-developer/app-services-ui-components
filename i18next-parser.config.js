module.exports = {
  contextSeparator: "~",
  nsSeparator: ":",
  keySeparator: ".",
  locales: ["en"],
  sort: true,
  createOldCatalogs: false,
  keepRemoved: true,
  failOnWarnings: true,

  // disabled for the moment: https://github.com/i18next/i18next-parser/issues/489
  // failOnUpdate: process.env.CI !== undefined,
};
