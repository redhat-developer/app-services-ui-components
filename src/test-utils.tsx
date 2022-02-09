import React, { FunctionComponent, ReactElement } from "react";
import {
  render,
  RenderOptions,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nProvider } from "./I18n";

const suspenseTestId = "i18n-suspense";

const AllTheProviders: FunctionComponent = ({ children }) => {
  return (
    <Router>
      <I18nProvider
        lng={"en"}
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
          },
          it: {
            common: () => Promise.resolve({ delete: "Elimina" }),
          },
        }}
        debug={false}
      >
        <React.Suspense
          fallback={<div data-testid={suspenseTestId}>loading</div>}
        >
          {children}
        </React.Suspense>
      </I18nProvider>
    </Router>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

async function waitForI18n(r: RenderResult) {
  await waitFor(() => {
    expect(r.queryByTestId(suspenseTestId)).not.toBeInTheDocument();
  });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, waitForI18n };
