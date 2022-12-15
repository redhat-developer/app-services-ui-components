import { expect } from "@storybook/jest";
import { render, waitForI18n, fireEvent, waitFor, screen } from "../test-utils";
import type { ClustersResponse } from "./DataSciencePage";
import { DataSciencePage } from "./DataSciencePage";

const installAddonResponse: ClustersResponse = {
  clusters: [],
  installableClusters: [
    {
      id: "installable-subs-1",
      cluster_id: "installable-cluster-1",
      display_name: "Installable cluster 1",
    },
    {
      id: "installable-subs-2",
      cluster_id: "installable-cluster-2",
      display_name: "Installable cluster 2",
    },
  ],
};

const upgradeAddonResponse: ClustersResponse = {
  clusters: [
    {
      id: "upgradeable-subs-1",
      cluster_id: "upgradeable-cluster-1",
      display_name: "Upgradeable cluster 1",
    },
    {
      id: "upgradeable-subs-2",
      cluster_id: "upgradeable-cluster-2",
      display_name: "Upgradeable cluster 2",
    },
  ],
  installableClusters: [],
};

const noClustersResponse: ClustersResponse = {
  clusters: [],
  installableClusters: [],
};

function loadInstallableClusters() {
  return Promise.resolve(installAddonResponse);
}

function loadUpgradeableClusters() {
  return Promise.resolve(upgradeAddonResponse);
}

function loadNoClusters() {
  return Promise.resolve(noClustersResponse);
}

class AnalyticsTester {
  expectedIndex = 0;
  expectedValues: string[];

  constructor(expectedValues: string[]) {
    this.expectedValues = expectedValues;
  }

  trackClick = (e: string) => {
    const expectedValue = this.expectedValues[this.expectedIndex++];
    if (expectedValue) {
      expect(e).toBe(expectedValue);
    }
  };
}

describe("DataSciencePage", () => {
  it("renders", async () => {
    const comp = render(
      <DataSciencePage
        loadClusters={loadNoClusters}
        trackClick={new AnalyticsTester([]).trackClick}
      />
    );
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();

    const btnSubmit = comp.getByTestId("hero-buttonInstall");
    expect(btnSubmit.dataset.ouiaComponentId).toBe("button-rhods-install");
  });

  test("should open and close modal", async () => {
    const comp = render(
      <DataSciencePage
        loadClusters={loadInstallableClusters}
        trackClick={new AnalyticsTester([]).trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");

    // modal is hidden
    expect(screen.queryByTestId("data-science-modal")).not.toBeInTheDocument();

    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });
    expect(screen.queryByTestId("data-science-modal")).toBeInTheDocument();

    // click cancel button
    await waitFor(() => {
      fireEvent.click(comp.getByTestId("install-RHODS-cancel"));
    });

    expect(screen.queryByTestId("data-science-modal")).not.toBeInTheDocument();
  });

  test("should open modal in install mode", async () => {
    const comp = render(
      <DataSciencePage
        loadClusters={loadInstallableClusters}
        trackClick={new AnalyticsTester([]).trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");

    // modal is hidden
    expect(screen.queryByTestId("data-science-modal")).not.toBeInTheDocument();

    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });
    expect(screen.queryByTestId("data-science-modal")).toBeInTheDocument();
    expect(
      screen.queryByText("Install OpenShift Data Science on your cluster")
    ).toBeInTheDocument();
  });

  test("should select cluster to which install RHODS addon", async () => {
    const comp = render(
      <DataSciencePage
        loadClusters={loadInstallableClusters}
        trackClick={new AnalyticsTester([]).trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");
    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });
    // open select menu
    fireEvent.click(
      screen.getByText(installAddonResponse.installableClusters[0].display_name)
    );
    // select second option
    fireEvent.click(
      screen.getByText(installAddonResponse.installableClusters[1].display_name)
    );
    const installButton = screen.getByTestId("install-RHODS-button");
    // check if the action has correct link to second cluster
    expect(installButton).toHaveAttribute(
      "href",
      `http://localhost/openshift/details/s/${installAddonResponse.installableClusters[1].id}#addOns`
    );
  });

  test("should select cluster to upgrade", async () => {
    const comp = render(
      <DataSciencePage
        loadClusters={loadUpgradeableClusters}
        trackClick={new AnalyticsTester([]).trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");
    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });
    // open select menu
    fireEvent.click(
      screen.getByText(upgradeAddonResponse.clusters[0].display_name)
    );
    // select second option
    fireEvent.click(
      screen.getByText(upgradeAddonResponse.clusters[1].display_name)
    );
    const upgradeButton = screen.getByTestId("upgrade-RHODS-button");
    // check if the action has correct link to second cluster
    expect(upgradeButton).toHaveAttribute(
      "href",
      `http://localhost/openshift/details/s/${upgradeAddonResponse.clusters[1].id}#machinePools`
    );
  });

  test("change action in upgreadable modal flow", async () => {
    const comp = render(
      <DataSciencePage
        loadClusters={loadUpgradeableClusters}
        trackClick={new AnalyticsTester([]).trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");
    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });

    const actionButton = screen.getByTestId("upgrade-RHODS-button");
    // check the action is in Upgrade mode
    expect(actionButton).toHaveTextContent("Upgrade");
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("radio-RHODS-action-create"));
    });
    // check the action is in UpgradeCreate
    expect(actionButton).toHaveTextContent("Create");
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("radio-RHODS-action-upgrade"));
    });
    // check the action is back in UpgradeCreate
    expect(actionButton).toHaveTextContent("Upgrade");
  });

  test("open modal in create mode", async () => {
    const comp = render(
      <DataSciencePage
        loadClusters={loadNoClusters}
        trackClick={new AnalyticsTester([]).trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");
    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });

    const modal = screen.queryByTestId("data-science-modal");
    expect(modal).toMatchSnapshot();
  });

  test("should track open and close", async () => {
    const analyticsTester = new AnalyticsTester([
      "rhods-hero-install-click",
      "rhods-modal-close",
    ]);

    const comp = render(
      <DataSciencePage
        loadClusters={loadInstallableClusters}
        trackClick={analyticsTester.trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");

    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });

    // click close button
    const modal = screen.queryByTestId("data-science-modal");
    const closeButton = modal?.parentNode?.querySelector("[aria-label=Close]");
    if (closeButton) {
      await waitFor(() => {
        fireEvent.click(closeButton);
      });
    }

    // tracked all clicks
    expect(analyticsTester.expectedIndex).toBe(2);
  });

  test("should track open and cancel in install mode", async () => {
    const analyticsTester = new AnalyticsTester([
      "rhods-hero-install-click",
      "rhods-modal-install-cancel",
    ]);

    const comp = render(
      <DataSciencePage
        loadClusters={loadInstallableClusters}
        trackClick={analyticsTester.trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");

    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });

    // click cancel button
    await waitFor(() => {
      fireEvent.click(comp.getByTestId("install-RHODS-cancel"));
    });

    // tracked all clicks
    expect(analyticsTester.expectedIndex).toBe(2);
  });

  test("should track open and cancel in upgrade mode", async () => {
    const analyticsTester = new AnalyticsTester([
      "rhods-hero-install-click",
      "rhods-modal-upgrade-cancel",
    ]);

    const comp = render(
      <DataSciencePage
        loadClusters={loadUpgradeableClusters}
        trackClick={analyticsTester.trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");
    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });

    // click cancel button
    await waitFor(() => {
      fireEvent.click(comp.getByTestId("install-RHODS-cancel"));
    });

    expect(analyticsTester.expectedIndex).toBe(2);
  });

  test("should track open and cancel in create mode", async () => {
    const analyticsTester = new AnalyticsTester([
      "rhods-hero-install-click",
      "rhods-modal-create-cluster-cancel",
    ]);

    const comp = render(
      <DataSciencePage
        loadClusters={loadNoClusters}
        trackClick={analyticsTester.trackClick}
      />
    );
    await waitForI18n(comp);
    const installBtn = comp.getByTestId("hero-buttonInstall");
    // click on install button to open modal
    await waitFor(() => {
      fireEvent.click(installBtn);
    });

    // click cancel button
    await waitFor(() => {
      fireEvent.click(comp.getByTestId("install-RHODS-cancel"));
    });

    expect(analyticsTester.expectedIndex).toBe(2);
  });
});
