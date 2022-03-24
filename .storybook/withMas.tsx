import React, { useEffect, useRef } from "react";
import { inspect, Inspector } from "@xstate/inspect";
import { BrowserRouter as Router } from "react-router-dom";
import { Args, ReactFramework } from "@storybook/react/types-6-0";
import { PartialStoryFn, StoryContext } from "@storybook/csf";

import { AppServicesLoading, I18nProvider } from "../src";

export const withMas = (
  Story: PartialStoryFn<ReactFramework, Args>,
  { globals }: StoryContext<ReactFramework, Args>
) => {
  const xstateInspectorRef = useRef(false);
  useEffect(() => {
    document.body.classList.toggle("show-ouia", JSON.parse(globals.ouia));
  }, [globals.ouia]);
  useEffect(() => {
    let inspector: Inspector | undefined = undefined;
    const showInspector = JSON.parse(globals.xstate) === true;
    if (showInspector !== xstateInspectorRef.current) {
      xstateInspectorRef.current = showInspector;
      if (showInspector) {
        inspector = inspect({
          // options
          url: "https://stately.ai/viz?inspect", // (default)
          iframe: false, // open in new window
        });
      }
    }
    return () => {
      if (inspector) {
        inspector.disconnect();
        inspector = undefined;
      }
    };
  }, [globals.xstate]);
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
            overview: () => import("../locales/en/overview.json"),
            datascienceoverview: () =>
              import("../locales/en/datascienceoverview.json"),
            apimgmtoverview: () => import("../locales/en/apimgmtoverview.json"),
            "manage-kafka-permissions": () =>
              import("../locales/en/manage-kafka-permissions.json"),
            "service-account": () =>
              import("../locales/en/service-account.json"),
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
};
