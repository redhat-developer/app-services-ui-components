import { PartialStoryFn, StoryContext } from "@storybook/csf";
import { Args, ReactFramework } from "@storybook/react/types-6-0";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AppServicesLoading, I18nProvider } from "../src";
import { InsightsChromeLayout } from "./InsightsChromeLayout";

export const withMas = (
  Story: PartialStoryFn<ReactFramework, Args>,
  { globals }: StoryContext<ReactFramework, Args>
) => {
  useEffect(() => {
    document.body.classList.toggle("show-ouia", JSON.parse(globals.ouia));
  }, [globals.ouia]);

  return (
    <InsightsChromeLayout withLayout={globals.withInsightsChrome === "true"}>
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
              overview: () => import("../locales/en/overview.json"),
              datascienceoverview: () =>
                import("../locales/en/datascienceoverview.json"),
              kafkaoverview: () => import("../locales/en/kafkaoverview.json"),
              apimgmtoverview: () =>
                import("../locales/en/apimgmtoverview.json"),
              "kafkaoverview-v2": () =>
                import("../locales/en/kafkaoverview-v2.json"),
              "manage-kafka-permissions": () =>
                import("../locales/en/manage-kafka-permissions.json"),
              "message-browser": () =>
                import("../locales/en/message-browser.json"),
              "overview-v2": () => import("../locales/en/overview-v2.json"),
              "create-kafka-instance-with-sizes": () =>
                import("../locales/en/create-kafka-instance-with-sizes.json"),
              "connection-tab": () =>
                import("../locales/en/connection-tab.json"),
              "service-registry": () =>
                import("../locales/en/service-registry.json"),
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
    </InsightsChromeLayout>
  );
};
