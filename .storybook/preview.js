import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/patternfly/utilities/BackgroundColor/BackgroundColor.css";
import "@patternfly/patternfly/utilities/Display/display.css";
import "@patternfly/patternfly/utilities/Flex/flex.css";
import "@patternfly/patternfly/utilities/Sizing/sizing.css";
import "@patternfly/patternfly/utilities/Spacing/spacing.css";
import "@patternfly/patternfly/utilities/Text/text.css";
import { inspect } from "@xstate/inspect";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppServicesLoading, I18nProvider } from "../src";

if (process.env.NODE_ENV === "development") {
  inspect({
    // options
    url: "https://stately.ai/viz?inspect", // (default)
    iframe: false, // open in new window
  });
}

export const parameters = {
  options: {
    storySort: {
      order: ["Intro", "Features", "Components", "Empty states", "*"],
    },
  },
  previewTabs: { "storybook/docs/panel": { index: -1 } },
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
};

export const decorators = [
  (Story, { globals }) => {
    return (
      <Router>
        <I18nProvider
          lng={globals.locale}
          resources={{
            en: {
              common: () => import("../locales/en/common.json"),
              "create-kafka-instance": () =>
                import("../locales/en/create-kafka-instance.json"),
              kafka: () => import("../locales/en/kafka.json"),
              metrics: () => import("../locales/en/metrics.json"),
            },
            it: {
              common: () => Promise.resolve({ delete: "Elimina" }),
            },
          }}
          debug={true}
        >
          <React.Suspense fallback={<AppServicesLoading />}>
            <Story />
          </React.Suspense>
        </I18nProvider>
      </Router>
    );
  },
];
