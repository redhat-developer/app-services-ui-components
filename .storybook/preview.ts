import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/patternfly/utilities/BackgroundColor/BackgroundColor.css";
import "@patternfly/patternfly/utilities/Display/display.css";
import "@patternfly/patternfly/utilities/Flex/flex.css";
import "@patternfly/patternfly/utilities/Sizing/sizing.css";
import "@patternfly/patternfly/utilities/Spacing/spacing.css";
import "@patternfly/patternfly/utilities/Text/text.css";
import "@patternfly/react-core/dist/styles/base.css";
import { withTests } from "@storybook/addon-jest";
import { DecoratorFunction } from "@storybook/csf";
import { Parameters, ReactFramework } from "@storybook/react/types-6-0";
import "./ouia-helper.css";
import { withMas } from "./withMas";

let results = {};
try {
  results = require("../.jest-test-results.json");
} catch (e) {}

export const parameters: Parameters = {
  xstate: {},
  xstateInspectOptions: {
    url: "https://stately.ai/viz?inspect",
    serialize: null,
  },
  layout: "fullscreen",
  options: {},
  previewTabs: { "storybook/docs/panel": { index: -1 } },
  withInsightsChrome: "false",
  ouia: "false",
  locale: "en_US",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "Background color 200",
    values: [
      {
        name: "Background color 100",
        value: "#ffffff",
      },
      {
        name: "Background color 200",
        value: "var(--pf-global--BackgroundColor--200)",
      },
    ],
  },
  viewport: {
    viewports: {
      xs: {
        name: "Breakpoint: xs",
        styles: {
          width: "400px",
          height: "100%",
        },
      },
      sm: {
        name: "Breakpoint: sm",
        styles: {
          width: "576px",
          height: "100%",
        },
      },
      md: {
        name: "Breakpoint: md",
        styles: {
          width: "768px",
          height: "100%",
        },
      },
      lg: {
        name: "Breakpoint: lg",
        styles: {
          width: "992px",
          height: "100%",
        },
      },
      xl: {
        name: "Breakpoint: xl",
        styles: {
          width: "1200px",
          height: "100%",
        },
      },
      "2xl": {
        name: "2Breakpoint: xl",
        styles: {
          width: "1450px",
          height: "100%",
        },
      },
    },
  },
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en-US",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en-US", right: "🇺🇸", title: "English (US)" },
        { value: "en-GB", right: "🇬🇧", title: "English (GB)" },
        {
          value: "it-IT",
          right: "🇮🇹",
          title: "Italian - only <Delete> is translated, fallbacks to English",
        },
        { value: "cimode", right: "🤓", title: "Show translation keys" },
      ],
    },
  },
  withInsightsChrome: {
    name: "Insights Chrome",
    description: "Show the console.redhat.com chrome UI",
    defaultValue: "false",
    toolbar: {
      items: [
        { value: "true", title: "Show layout" },
        { value: "false", title: "Hide layout" },
      ],
      showName: true,
    },
  },
  ouia: {
    name: "OUIA",
    description: "Show OUIA ids used in the component",
    defaultValue: "false",
    toolbar: {
      items: [
        { value: "true", title: "Show OUIA ids" },
        { value: "false", title: "Hide OUIA ids" },
      ],
      showName: true,
    },
  },
};

export const decorators: DecoratorFunction<ReactFramework>[] = [
  withTests({
    results,
    filesExt: ".test.tsx",
  }),
  withMas,
];
