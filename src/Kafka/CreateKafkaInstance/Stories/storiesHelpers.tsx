import { Button } from "@patternfly/react-core";
import { actions, action } from "@storybook/addon-actions";
import type { PlayFunction } from "@storybook/csf";
import { expect } from "@storybook/jest";
import type { Meta, Story } from "@storybook/react";
import type { ReactFramework } from "@storybook/react/types-6-0";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { useState } from "react";
import { apiError, fakeApi } from "../../../shared/storiesHelpers";
import type { CreateKafkaInstanceProps } from "../CreateKafkaInstance";
import { CreateKafkaInstance } from "../CreateKafkaInstance";
import type {
  CloudProvider,
  CloudProviderInfo,
  CloudProviders,
  CreateKafkaInitializationData,
  MarketPlace,
  MarketPlaceSubscriptions,
  StandardPlanAvailability,
  StandardSizes,
  TrialPlanAvailability,
  TrialSizes,
} from "../types";

export const AWS: CloudProviderInfo = {
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

export const AZURE: CloudProviderInfo = {
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

export const PROVIDERS: CloudProviders = [AWS, AZURE];

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
};

export function makeAvailableProvidersAndDefaultsForStandardPlan(
  options: {
    instanceAvailability: StandardPlanAvailability;
    defaultProvider: CloudProvider | undefined;
    providers: string[];
    remainingPrepaidQuota: number | undefined;
    remainingMarketplaceQuota: number | undefined;
    marketplacesQuota: MarketPlaceSubscriptions[];
  },
  allProviders = PROVIDERS,
  latency = 500
): () => Promise<CreateKafkaInitializationData> {
  const {
    instanceAvailability,
    defaultProvider,
    providers,
    remainingPrepaidQuota,
    remainingMarketplaceQuota,
    marketplacesQuota,
  } = options;
  const availableProviders = allProviders.filter((p) =>
    providers.includes(p.id)
  );

  return () =>
    fakeApi<CreateKafkaInitializationData>(
      {
        plan: "standard",
        defaultProvider,
        availableProviders,
        instanceAvailability,
        remainingPrepaidQuota,
        remainingMarketplaceQuota,
        marketplacesQuota,
      },
      latency
    );
}

export function makeAvailableProvidersAndDefaultsForTrialPlan(
  options: {
    instanceAvailability: TrialPlanAvailability;
    defaultProvider: CloudProvider | undefined;
    providers: string[];
  },
  allProviders = PROVIDERS,
  latency = 500
): () => Promise<CreateKafkaInitializationData> {
  const { instanceAvailability, defaultProvider, providers } = options;
  const availableProviders = allProviders.filter((p) =>
    providers.includes(p.id)
  );

  return () =>
    fakeApi<CreateKafkaInitializationData>(
      {
        plan: "trial",
        defaultProvider,
        availableProviders,
        instanceAvailability,
      },
      latency
    );
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
    options: ["standard", "trial"],
  },
  apiStandardScenario: {
    table: { category: "Plan" },
    control: "radio",
    options: [
      "available",
      "over-quota",
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
    if: { arg: "apiPlan", eq: "trial" },
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
  apiPlan: "trial" | "standard";
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
  apiLatency: 500,
  onCreate: (_data, onSuccess) => {
    action("onCreate")(_data);
    setTimeout(onSuccess, 500);
  },
  subscriptionOptionsHref: "https://www.redhat.com",
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
    apiMarketplacesAzure,
    apiMarketplacesAzureSubscriptions,
    apiMarketplacesRH,
    apiMarketplacesRHSubscriptions,

    apiLatency = 500,
  } = args;

  const providers =
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
        }));

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

  const marketplacesQuota: MarketPlaceSubscriptions[] = [
    makeMarketplace("aws", apiMarketplacesAWSSubscriptions),

    makeMarketplace("azure", apiMarketplacesAzureSubscriptions),
    makeMarketplace("rh", apiMarketplacesRHSubscriptions),
  ].filter((q) => {
    switch (q.marketplace) {
      case "aws":
        return apiMarketplacesAWS;
      case "azure":
        return apiMarketplacesAzure;
      case "rh":
        return apiMarketplacesRH;
      default:
        return false;
    }
  });

  const getAvailableProvidersAndDefaults = apiSimulateBackendError
    ? () => apiError<CreateKafkaInitializationData>(undefined, apiLatency)
    : apiPlan === "standard"
    ? makeAvailableProvidersAndDefaultsForStandardPlan(
        {
          instanceAvailability: apiStandardScenario,
          defaultProvider: apiDefaultProvider,
          providers: apiProviders,
          remainingPrepaidQuota: apiRemainingPrepaid
            ? apiRemainingPrepaidQuota
            : undefined,
          remainingMarketplaceQuota: apiHasMarketplaceSubscriptions
            ? apiRemainingMarketplaceQuota
            : undefined,
          marketplacesQuota: apiHasMarketplaceSubscriptions
            ? marketplacesQuota
            : [],
        },
        providers,
        apiLatency
      )
    : makeAvailableProvidersAndDefaultsForTrialPlan(
        {
          instanceAvailability: apiTrialScenario,
          defaultProvider: apiDefaultProvider,
          providers: apiProviders,
        },
        providers,
        apiLatency
      );

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
        getAvailableProvidersAndDefaults={getAvailableProvidersAndDefaults}
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

  await waitFor(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(canvas.getByLabelText("Name *")).toBeEnabled();
  });

  userEvent.type(await canvas.findByLabelText("Name *"), "instance-name");

  const regionSelect = await canvas.findByText("Cloud region");
  userEvent.click(regionSelect);
  userEvent.click(await canvas.findByText("US East, N. Virginia"));

  expect(await canvas.findByTestId("size-slider")).not.toBeNull();

  userEvent.click(await canvas.findByTestId("modalCreateKafka-buttonSubmit"));
};
