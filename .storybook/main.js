module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-xstate-addon/preset",
    "storybook-i18n/preset",
    "@storybook/addon-a11y",
  ],
};
