import type { ClustersResponse } from "../DataSciencePage";

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

export function loadInstallableClusters() {
  return Promise.resolve(installAddonResponse);
}

export function loadUpgradeableClusters() {
  return Promise.resolve(upgradeAddonResponse);
}

export function loadNoClusters() {
  return Promise.resolve(noClustersResponse);
}

export const clusterResponseTypes = [
  "With installable clusters",
  "With upgreadable clusters",
  "No suitale clusters",
];
export const clusterResponseOptions = {
  [clusterResponseTypes[0]]: loadInstallableClusters,
  [clusterResponseTypes[1]]: loadUpgradeableClusters,
  [clusterResponseTypes[2]]: loadNoClusters,
};

export const argTypes = {
  loadClusters: {
    description: "Select API response",
    control: "radio",
    options: clusterResponseTypes,
  },
  trackClick: {
    table: {
      disable: true,
    },
  },
};
