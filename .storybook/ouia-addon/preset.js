function managerEntries(entry = []) {
  return [...entry, require.resolve("./register.tsx")]; //👈 Addon implementation
}

function config(entry = [], { addDecorator = true } = {}) {
  const c = [];
  if (addDecorator) {
    c.push(require.resolve("./addDecorator"));
  }
  return [...entry, ...c];
}

module.exports = { managerEntries, config };
