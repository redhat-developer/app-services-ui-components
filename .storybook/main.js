module.exports = {
  stories: [
    "../docs/**/*.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "./ouia-addon/preset",
  ],
  features: {
    interactionsDebugger: true,
  },
  core: {
    builder: "webpack5",
  },
};
