import { Button } from "@patternfly/react-core";
import { action, actions } from "@storybook/addon-actions";
import type { PlayFunction } from "@storybook/csf";
import { expect } from "@storybook/jest";
import type { Meta, Story } from "@storybook/react";
import type { ReactFramework } from "@storybook/react/types-6-0";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { useState } from "react";
import { apiError, fakeApi } from "../../../shared/storiesHelpers";
import type {
  CloudProvider,
  MarketPlace,
  MarketPlaceSubscriptions,
} from "../../types";
import type { CreateKafkaInstanceProps } from "../CreateKafkaInstance";
import { CreateKafkaInstance } from "../CreateKafkaInstance";
import type { CreateKafkaInstanceServices } from "../machines";
import type {
  CloudProviderInfo,
  StandardPlanAvailability,
  StandardSizes,
  TrialPlanAvailability,
  TrialSizes,
} from "../types";

const AWS: CloudProviderInfo = {
  id: "aws",
  displayName: "Amazon Web Services",
  regions: [
    { id: "eu-west-1", displayName: "EU, Ireland", isDisabled: false },
    {
      id: "us-east-1",
      displayName: "US East, N. Virginia",
      isDisabled: false,
    },
  ],
};

const AZURE: CloudProviderInfo = {
  id: "azure",
  displayName: "Microsoft Azure",
  regions: [
    {
      id: "australiaeast",
      displayName: "Australia East",
      isDisabled: false,
    },
    {
      id: "europenorth",
      displayName: "Europe North",
      isDisabled: false,
    },
  ],
};

const GCP: CloudProviderInfo = {
  id: "gcp",
  displayName: "Google Cloud Platform",
  regions: [
    { id: "eu-west-1", displayName: "EU, Ireland", isDisabled: false },
    {
      id: "us-east-1",
      displayName: "US East, N. Virginia",
      isDisabled: false,
    },
  ],
};

export const PROVIDERS: CloudProviderInfo[] = [AWS, GCP, AZURE];

const STANDARD_SIZES: { [key in CloudProvider]: StandardSizes } = {
  aws: [
    {
      id: "x1",
      displayName: "1",
      quota: 1,
      status: "stable",
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
      isDisabled: false,
    },
    {
      id: "x2",
      displayName: "2",
      quota: 2,
      status: "preview",
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
      isDisabled: false,
    },
    {
      id: "x3",
      displayName: "3",
      quota: 3,
      status: "preview",
      ingress: 300,
      egress: 3001,
      storage: 500,
      connections: 600,
      connectionRate: 700,
      maxPartitions: 800,
      messageSize: 900,
      isDisabled: true,
    },
    {
      id: "x5",
      displayName: "5",
      quota: 5,
      status: "preview",
      ingress: 300,
      egress: 3001,
      storage: 500,
      connections: 600,
      connectionRate: 700,
      maxPartitions: 800,
      messageSize: 900,
      isDisabled: false,
    },
  ],
  azure: [
    {
      id: "x1",
      displayName: "1",
      quota: 3,
      status: "preview",
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
      isDisabled: false,
    },
    {
      id: "x2",
      displayName: "2",
      quota: 9,
      status: "preview",
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
      isDisabled: false,
    },
  ],
  gcp: [
    {
      id: "x1",
      displayName: "1",
      quota: 3,
      status: "preview",
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
      isDisabled: false,
    },
    {
      id: "x2",
      displayName: "2",
      quota: 9,
      status: "preview",
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
      isDisabled: false,
    },
  ],
};

const TRIAL_SIZES: { [key in CloudProvider]: TrialSizes } = {
  aws: {
    standard: STANDARD_SIZES.aws,
    trial: {
      id: "trialx1",
      displayName: "1",
      quota: 0,
      status: "stable",
      ingress: 1,
      egress: 1,
      storage: 1,
      connections: 1,
      connectionRate: 1,
      maxPartitions: 1,
      messageSize: 1,
      trialDurationHours: 48,
      isDisabled: false,
    },
  },
  azure: {
    standard: STANDARD_SIZES.azure,
    trial: {
      id: "trialx1",
      displayName: "1",
      quota: 0,
      status: "stable",
      ingress: 1,
      egress: 1,
      storage: 1,
      connections: 1,
      connectionRate: 1,
      maxPartitions: 1,
      messageSize: 1,
      trialDurationHours: 24,
      isDisabled: false,
    },
  },
  gcp: {
    standard: STANDARD_SIZES.gcp,
    trial: {
      id: "trialx1",
      displayName: "1",
      quota: 0,
      status: "stable",
      ingress: 1,
      egress: 1,
      storage: 1,
      connections: 1,
      connectionRate: 1,
      maxPartitions: 1,
      messageSize: 1,
      trialDurationHours: 24,
      isDisabled: false,
    },
  },
};

function makeCheckStandardQuota(
  options: {
    standardScenario: StandardPlanAvailability;
    developerScenario: TrialPlanAvailability;
    remainingPrepaidQuota: number | undefined;
    remainingMarketplaceQuota: number | undefined;
    marketplaceSubscriptions: MarketPlaceSubscriptions[];
  },
  latency = 500
): CreateKafkaInstanceServices["checkStandardQuota"] {
  const {
    standardScenario,
    developerScenario,
    remainingPrepaidQuota,
    remainingMarketplaceQuota,
    marketplaceSubscriptions,
  } = options;
  const cb: CreateKafkaInstanceServices["checkStandardQuota"] = ({
    onQuotaAvailable,
    onNoQuotaAvailable,
    onOutOfQuota,
  }) => {
    setTimeout(() => {
      switch (standardScenario) {
        case "available":
        case "regions-unavailable":
          onQuotaAvailable({
            quota: {
              marketplaceSubscriptions,
              remainingMarketplaceQuota,
              remainingPrepaidQuota,
            },
          });
          break;
        case "instance-unavailable":
          onNoQuotaAvailable({
            hasTrialQuota: developerScenario === "available",
          });
          break;
        case "out-of-quota":
          onOutOfQuota({
            quota: {
              marketplaceSubscriptions,
            },
          });
      }
    }, latency);
  };
  return cb;
}

function makeCheckDeveloperAvailability(
  availability: TrialPlanAvailability,
  latency: number
) {
  const cb: CreateKafkaInstanceServices["checkDeveloperAvailability"] = ({
    onAvailable,
    onUsed,
    onUnavailable,
  }) => {
    setTimeout(() => {
      switch (availability) {
        case "available":
          onAvailable();
          break;
        case "used":
          onUsed();
          break;
        case "unavailable":
          onUnavailable();
          break;
      }
    }, latency);
  };
  return cb;
}

const regionsScenario = {
  full: "All regions available",
  oneProviderUnavailable: "One provider with no all regions disabled",
  someRegionsUnavailable: "Some regions disabled for all providers",
  regionsDisabled: "All regions disabled for all providers",
  regionsMissingForOneProvider: "No regions returned from API for a provider",
  regionsMissing: "No regions returned from API for all providers",
};

export const argTypes = {
  apiPlan: {
    table: { category: "Plan" },
    control: "radio",
    options: ["standard", "developer"],
  },
  apiStandardScenario: {
    table: { category: "Plan" },
    control: "radio",
    options: [
      "available",
      "out-of-quota",
      "instance-unavailable",
      "regions-unavailable",
      "backend-error",
    ],
    if: { arg: "apiPlan", eq: "standard" },
  },
  apiTrialScenario: {
    table: { category: "Plan" },
    control: "radio",
    options: ["available", "used", "unavailable", "backend-error"],
    if: { arg: "apiPlan", eq: "developer" },
  },
  apiRemainingPrepaid: {
    table: { category: "Quota" },
    control: {
      type: "boolean",
    },
    if: { arg: "apiPlan", eq: "standard" },
  },
  apiRemainingPrepaidQuota: {
    table: { category: "Quota" },
    control: {
      type: "range",
      min: 0,
      max: 25,
    },
    if: { arg: "apiRemainingPrepaid" },
  },
  apiHasMarketplaceSubscriptions: {
    table: { category: "Quota" },
    control: {
      type: "boolean",
    },
    if: { arg: "apiPlan", eq: "standard" },
  },
  apiRemainingMarketplaceQuota: {
    table: { category: "Quota" },
    control: {
      type: "range",
      min: 0,
      max: 25,
    },
    if: { arg: "apiHasMarketplaceSubscriptions" },
  },
  apiMarketplacesAWS: {
    table: { category: "Quota", subcategory: "Amazon Web Services" },
    control: {
      type: "boolean",
    },
    if: { arg: "apiHasMarketplaceSubscriptions" },
  },
  apiMarketplacesAWSSubscriptions: {
    table: { category: "Quota", subcategory: "Amazon Web Services" },
    control: {
      type: "range",
      min: 0,
      max: 25,
    },
    if: { arg: "apiMarketplacesAWS" },
  },
  apiMarketplacesAzure: {
    table: { category: "Quota", subcategory: "Azure" },
    control: {
      type: "boolean",
    },
    if: { arg: "apiHasMarketplaceSubscriptions" },
  },
  apiMarketplacesAzureSubscriptions: {
    table: { category: "Quota", subcategory: "Azure" },
    control: {
      type: "range",
      min: 0,
      max: 25,
    },
    if: { arg: "apiMarketplacesAzure" },
  },
  apiMarketplacesGCP: {
    table: { category: "Quota", subcategory: "Azure" },
    control: {
      type: "boolean",
    },
    if: { arg: "apiHasMarketplaceSubscriptions" },
  },
  apiMarketplacesGCPSubscriptions: {
    table: { category: "Quota", subcategory: "gcp" },
    control: {
      type: "range",
      min: 0,
      max: 25,
    },
    if: { arg: "apiMarketplacesGCP" },
  },
  apiMarketplacesRH: {
    table: { category: "Quota", subcategory: "Red Hat Marketplace" },
    control: {
      type: "boolean",
    },
    if: { arg: "apiHasMarketplaceSubscriptions" },
  },
  apiMarketplacesRHSubscriptions: {
    table: { category: "Quota", subcategory: "Red Hat Marketplace" },
    control: {
      type: "range",
      min: 0,
      max: 25,
    },
    if: { arg: "apiMarketplacesRH" },
  },

  apiSimulateBackendError: {
    table: { category: "Backend scenario" },
    control: "boolean",
  },
  apiRegionsAvailability: {
    options: Object.keys(regionsScenario),
    table: { category: "Backend scenario" },
    control: {
      type: "radio",
      labels: regionsScenario,
    },
  },
  apiSizes: {
    options: ["normal", "no-sizes", "error"],
    table: { category: "Backend scenario" },
    control: "radio",
  },
  apiProviders: {
    options: PROVIDERS.map((p) => p.id),
    table: { category: "Providers & regions" },
    control: {
      type: "check",
      labels: Object.fromEntries(PROVIDERS.map((p) => [p.id, p.displayName])),
    },
  },
  apiDefaultProvider: {
    options: PROVIDERS.map((p) => p.id),
    table: { category: "Providers & regions" },
    control: {
      type: "radio",
      labels: Object.fromEntries(PROVIDERS.map((p) => [p.id, p.displayName])),
    },
  },
  apiDefaultRegion: {
    options: PROVIDERS.flatMap((p) => p.regions.map((r) => r.id)),
    table: { category: "Providers & regions" },
    control: {
      type: "radio",
      labels: Object.fromEntries(
        PROVIDERS.flatMap((p) =>
          p.regions.map((r) => [r.id, `${p.displayName} - ${r.displayName}`])
        )
      ),
    },
  },
  apiLatency: {
    table: { category: "Backend scenario" },
    control: "number",
  },
};

export type StoryProps = {
  apiPlan: "developer" | "standard";
  apiStandardScenario: StandardPlanAvailability;
  apiTrialScenario: TrialPlanAvailability;
  apiSimulateBackendError: boolean;
  apiSizes: "normal" | "no-sizes" | "error";
  apiProviders: CloudProvider[];
  apiDefaultProvider: CloudProvider;
  apiRegionsAvailability: keyof typeof regionsScenario;
  apiRemainingPrepaid: boolean;
  apiRemainingPrepaidQuota: number;
  apiHasMarketplaceSubscriptions: boolean;
  apiRemainingMarketplaceQuota: number;
  apiMarketplacesAWS: boolean;
  apiMarketplacesAWSSubscriptions: number;
  apiMarketplacesAzure: boolean;
  apiMarketplacesGCP: boolean;
  apiMarketplacesGCPSubscriptions: number;
  apiMarketplacesAzureSubscriptions: number;
  apiMarketplacesRH: boolean;
  apiMarketplacesRHSubscriptions: number;
  apiLatency: number;
  onCreate: CreateKafkaInstanceProps["onCreate"];
  onClickQuickStart?: () => void;
  onClickContactUs?: () => void;
  onLearnHowToAddStreamingUnits?: () => void;
  onLearnMoreAboutSizes?: () => void;
  onClickKafkaOverview?: () => void;
  subscriptionOptionsHref: string;
};

export const defaultStoryArgs: StoryProps = {
  apiPlan: "standard",
  apiStandardScenario: "available",
  apiTrialScenario: "available",
  apiProviders: PROVIDERS.map((p) => p.id),
  apiSizes: "normal",
  apiDefaultProvider: "aws",
  apiRegionsAvailability: "full",
  apiRemainingPrepaid: true,
  apiRemainingPrepaidQuota: 3,
  apiHasMarketplaceSubscriptions: false,
  apiRemainingMarketplaceQuota: 3,
  apiMarketplacesAWS: true,
  apiMarketplacesAWSSubscriptions: 2,
  apiMarketplacesAzure: true,
  apiMarketplacesAzureSubscriptions: 1,
  apiMarketplacesRH: true,
  apiMarketplacesRHSubscriptions: 1,
  apiSimulateBackendError: false,
  apiMarketplacesGCP: true,
  apiMarketplacesGCPSubscriptions: 1,
  apiLatency: process.env.JEST_WORKER_ID ? 10 : 200,
  onCreate: (_data, onSuccess) => {
    action("onCreate")(_data);
    setTimeout(onSuccess, 500);
  },
  subscriptionOptionsHref: "/../overview",
};

export type StoryMeta = Meta<StoryProps>;

export const parameters = {
  controls: { include: /^api/ },
};

export const Template: Story<StoryProps> = (args, { id }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  const onOpenModal = () => {
    setIsModalOpen(true);
  };
  const onCreate: CreateKafkaInstanceProps["onCreate"] = (
    data,
    onSuccess,
    onFailure
  ) => {
    args.onCreate(
      data,
      () => {
        onSuccess();
        onCloseModal();
      },
      onFailure
    );
  };

  const {
    apiProviders,
    apiDefaultProvider,
    apiPlan,
    apiTrialScenario,
    apiStandardScenario,
    apiSimulateBackendError,
    apiRegionsAvailability,
    apiSizes,
    apiRemainingPrepaid,
    apiRemainingPrepaidQuota,
    apiHasMarketplaceSubscriptions,
    apiRemainingMarketplaceQuota,
    apiMarketplacesAWS,
    apiMarketplacesAWSSubscriptions,
    apiMarketplacesGCP,
    apiMarketplacesGCPSubscriptions,
    apiMarketplacesAzure,
    apiMarketplacesAzureSubscriptions,
    apiMarketplacesRH,
    apiMarketplacesRHSubscriptions,

    apiLatency = 500,
  } = args;

  const providers = (
    apiRegionsAvailability === "full"
      ? PROVIDERS
      : apiRegionsAvailability === "oneProviderUnavailable"
      ? PROVIDERS.map((p, idx) => ({
          ...p,
          regions: p.regions.map((r) => ({ ...r, isDisabled: idx === 0 })),
        }))
      : apiRegionsAvailability === "someRegionsUnavailable"
      ? PROVIDERS.map((p) => ({
          ...p,
          regions: p.regions.map((r, idx) => ({ ...r, isDisabled: idx === 0 })),
        }))
      : apiRegionsAvailability === "regionsDisabled"
      ? PROVIDERS.map((p) => ({
          ...p,
          regions: p.regions.map((r) => ({ ...r, isDisabled: true })),
        }))
      : apiRegionsAvailability === "regionsMissingForOneProvider"
      ? PROVIDERS.map((p, idx) => ({
          ...p,
          regions: idx === 0 ? [] : p.regions,
        }))
      : PROVIDERS.map((p) => ({
          ...p,
          regions: [],
        }))
  ).filter((p) => apiProviders.includes(p.id));

  function makeSubscriptions(provider: string, count: number) {
    return Array(count)
      .fill("")
      .map(
        (_, i) =>
          `${provider}-${window.btoa(
            encodeURIComponent(provider.padEnd(10, `${i}`))
          )}`
      );
  }

  function makeMarketplace(
    marketplace: MarketPlace,
    subscriptionCount: number
  ): MarketPlaceSubscriptions {
    return {
      marketplace,
      subscriptions: makeSubscriptions(marketplace, subscriptionCount),
    };
  }

  const marketplaceSubscriptions: MarketPlaceSubscriptions[] = [
    makeMarketplace("aws", apiMarketplacesAWSSubscriptions),

    makeMarketplace("azure", apiMarketplacesAzureSubscriptions),
    makeMarketplace("rhm", apiMarketplacesRHSubscriptions),
    makeMarketplace("gcp", apiMarketplacesGCPSubscriptions),
  ].filter((q) => {
    switch (q.marketplace) {
      case "aws":
        return apiMarketplacesAWS;
      case "azure":
        return apiMarketplacesAzure;
      case "rhm":
        return apiMarketplacesRH;
      case "gcp":
        return apiMarketplacesGCP;
      default:
        return false;
    }
  });

  const checkStandardQuota = apiSimulateBackendError
    ? () => apiError<void>(undefined, apiLatency)
    : makeCheckStandardQuota(
        {
          standardScenario:
            apiPlan === "standard"
              ? apiStandardScenario
              : "instance-unavailable",
          developerScenario: apiTrialScenario,
          remainingPrepaidQuota: apiRemainingPrepaid
            ? apiRemainingPrepaidQuota
            : undefined,
          remainingMarketplaceQuota: apiHasMarketplaceSubscriptions
            ? apiRemainingMarketplaceQuota
            : undefined,
          marketplaceSubscriptions: apiHasMarketplaceSubscriptions
            ? marketplaceSubscriptions
            : [],
        },
        apiLatency
      );

  const checkDeveloperAvailability = apiSimulateBackendError
    ? () => apiError<void>(undefined, apiLatency)
    : makeCheckDeveloperAvailability(apiTrialScenario, apiLatency);

  const fetchProvidersWithRegions: CreateKafkaInstanceServices["fetchProvidersWithRegions"] =
    (_, { onAvailable, onUnavailable }) => {
      const timeout = setTimeout(() => {
        switch (apiRegionsAvailability) {
          case "regionsMissing":
          case "regionsDisabled":
            onUnavailable();
            break;
          default:
            onAvailable({
              providers,
              defaultProvider: apiDefaultProvider,
            });
        }
        return () => clearTimeout(timeout);
      }, apiLatency);
    };

  const getStandardSizes: CreateKafkaInstanceProps["getStandardSizes"] = (
    provider
  ) => {
    return apiSizes === "normal"
      ? fakeApi<StandardSizes>(STANDARD_SIZES[provider], apiLatency)
      : apiSizes === "no-sizes"
      ? fakeApi<StandardSizes>([], apiLatency)
      : apiError<StandardSizes>(undefined, apiLatency);
  };

  const getTrialSizes: CreateKafkaInstanceProps["getTrialSizes"] = (
    provider
  ) => {
    return apiSizes === "normal"
      ? fakeApi<TrialSizes>(TRIAL_SIZES[provider], apiLatency)
      : apiSizes === "no-sizes"
      ? fakeApi<TrialSizes>({} as TrialSizes, apiLatency)
      : apiError<TrialSizes>(undefined, apiLatency);
  };

  const onClickHandlers = actions(
    "onClickQuickStart",
    "onClickKafkaOverview",
    "onClickContactUs",
    "onLearnHowToAddStreamingUnits",
    "onLearnMoreAboutSizes",
    "onClickKafkaOverview"
  );

  return (
    <div style={{ transform: "scale(1)", minHeight: 850, height: "100%" }}>
      <CreateKafkaInstance
        key={JSON.stringify(args)}
        checkDeveloperAvailability={checkDeveloperAvailability}
        checkStandardQuota={checkStandardQuota}
        fetchProvidersWithRegions={fetchProvidersWithRegions}
        getStandardSizes={getStandardSizes}
        getTrialSizes={getTrialSizes}
        appendTo={() =>
          document.getElementById(`story--${id}`) ||
          document.getElementById("root") ||
          document.body
        }
        isModalOpen={isModalOpen}
        onCancel={onCloseModal}
        onCreate={onCreate}
        disableFocusTrap={true}
        onClickQuickStart={
          args.onClickQuickStart || onClickHandlers.onClickQuickStart
        }
        onClickContactUs={
          args.onClickContactUs || onClickHandlers.onClickContactUs
        }
        onLearnHowToAddStreamingUnits={
          args.onLearnHowToAddStreamingUnits ||
          onClickHandlers.onLearnHowToAddStreamingUnits
        }
        onLearnMoreAboutSizes={
          args.onLearnMoreAboutSizes || onClickHandlers.onLearnMoreAboutSizes
        }
        onClickKafkaOverview={
          args.onClickKafkaOverview || onClickHandlers.onClickKafkaOverview
        }
        subscriptionOptionsHref={args.subscriptionOptionsHref}
      />
      <div>
        <Button onClick={() => onOpenModal()}>Open modal</Button>
      </div>
    </div>
  );
};

export const sampleSubmit: PlayFunction<ReactFramework, StoryProps> = async ({
  canvasElement,
}) => {
  const canvas = within(canvasElement);

  await waitFor(
    () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      expect(canvas.getByLabelText("Name *")).toBeEnabled();
    },
    { timeout: 3000 }
  );

  userEvent.type(await canvas.findByLabelText("Name *"), "instance-name");

  const regionSelect = await canvas.findByText("Cloud region");
  userEvent.click(regionSelect);
  userEvent.click(await canvas.findByText("US East, N. Virginia"));

  expect(await canvas.findByTestId("size-slider")).not.toBeNull();

  userEvent.click(await canvas.findByTestId("modalCreateKafka-buttonSubmit"));
};
