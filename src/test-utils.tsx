import type { RenderOptions, RenderResult } from "@testing-library/react";
import { act, render, waitFor } from "@testing-library/react";
import type { FunctionComponent, ReactElement } from "react";
import { Suspense } from "react";
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
            kafkaoverview: () => import("../locales/en/kafkaoverview.json"),
            apimgmtoverview: () => import("../locales/en/apimgmtoverview.json"),
            "manage-kafka-permissions": () =>
              import("../locales/en/manage-kafka-permissions.json"),
            "service-account": () =>
              import("../locales/en/service-account.json"),
            "message-browser": () =>
              import("../locales/en/message-browser.json"),
            "overview-v2": () => import("../locales/en/overview-v2.json"),
            "kafkaoverview-v2": () =>
              import("../locales/en/kafkaoverview-v2.json"),
            "create-kafka-instance-with-sizes": () =>
              import("../locales/en/create-kafka-instance-with-sizes.json"),
            "connection-tab": () => import("../locales/en/connection-tab.json"),
          },
          it: {
            common: () => Promise.resolve({ delete: "Elimina" }),
          },
        }}
        debug={false}
      >
        <Suspense fallback={<div data-testid={suspenseTestId}>loading</div>}>
          {children}
        </Suspense>
      </I18nProvider>
    </Router>
  );
};

const AllTheProvidersWithRoot: FunctionComponent = ({ children }) => (
  <AllTheProviders>
    <div id={"root"}>{children}</div>
  </AllTheProviders>
);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

const renderDialog = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProvidersWithRoot, ...options });

async function waitForI18n(r: RenderResult) {
  await waitFor(() => {
    expect(r.queryByTestId(suspenseTestId)).not.toBeInTheDocument();
  });
}

async function waitForPopper() {
  await act(async () => {
    /* let popper do its updates */
  });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, renderDialog, waitForI18n, waitForPopper };
