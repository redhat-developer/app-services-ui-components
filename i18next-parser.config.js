module.exports = {
  contextSeparator: "~",
  nsSeparator: ":",
  keySeparator: ".",
  locales: ["en"],
  sort: true,
  createOldCatalogs: false,
  keepRemoved: true,
  failOnWarnings: true,
  failOnUpdate: process.env.CI !== undefined,
};
