import { Button } from "@patternfly/react-core";
import { actions } from "@storybook/addon-actions";
import type { PlayFunction } from "@storybook/csf";
import { expect } from "@storybook/jest";
import type { Meta, Story } from "@storybook/react";
import type { ReactFramework } from "@storybook/react/types-6-0";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { useState } from "react";
import { apiError, fakeApi } from "../../../shared/storiesHelpers";
import type { CreateKafkaInstancePropsWithSizes } from "../CreateKafkaInstanceWithSizes";
import { CreateKafkaInstanceWithSizes } from "../CreateKafkaInstanceWithSizes";
import type {
  CreateKafkaInitializationData,
  GetSizesData,
  InstanceAvailability,
  Provider,
  ProviderInfo,
  Providers,
  Size,
} from "../types";

export const AWS: ProviderInfo = {
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

export const AZURE: ProviderInfo = {
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

export const PROVIDERS: Providers = [AWS, AZURE];

const SIZES: { [key: string]: GetSizesData } = {
  aws: {
    standard: [
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
        trialDurationHours: undefined,
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
        trialDurationHours: undefined,
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
        trialDurationHours: undefined,
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
        trialDurationHours: undefined,
        isDisabled: false,
      },
    ],
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
    standard: [
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
        trialDurationHours: undefined,
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
        trialDurationHours: undefined,
        isDisabled: false,
      },
    ],
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

export function makeAvailableProvidersAndDefaults(
  options: {
    plan: "trial" | "standard";
    instanceAvailability: InstanceAvailability;
    defaultProvider: Provider | undefined;
    providers: string[];
    maxStreamingUnits: number;
    remainingQuota: number;
  },
  allProviders = PROVIDERS,
  latency = 500
): () => Promise<CreateKafkaInitializationData> {
  const {
    instanceAvailability,
    defaultProvider,
    providers,
    maxStreamingUnits,
    remainingQuota,
    plan,
  } = options;
  const availableProviders = allProviders.filter((p) =>
    providers.includes(p.id)
  );

  return () =>
    fakeApi<CreateKafkaInitializationData>(
      {
        plan,
        defaultProvider,
        availableProviders,
        instanceAvailability,
        maxStreamingUnits,
        remainingQuota,
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
    description: "Subscription type",
    control: "radio",
    options: ["standard", "trial"],
  },
  apiScenario: {
    control: "radio",
    options: [
      "standard-available",
      "trial-available",
      "over-quota",
      "trial-used",
      "instance-unavailable",
      "regions-unavailable",
      "backend-error",
    ],
  },
  apiProviders: {
    options: PROVIDERS.map((p) => p.id),
    control: {
      type: "check",
      labels: Object.fromEntries(PROVIDERS.map((p) => [p.id, p.displayName])),
    },
  },
  apiRegionsAvailability: {
    options: Object.keys(regionsScenario),
    control: {
      type: "radio",
      labels: regionsScenario,
    },
  },
  apiSizes: {
    options: ["normal", "no-sizes", "error"],
    control: "radio",
  },
  apiDefaultProvider: {
    options: PROVIDERS.map((p) => p.id),
    control: {
      type: "radio",
      labels: Object.fromEntries(PROVIDERS.map((p) => [p.id, p.displayName])),
    },
  },
  apiDefaultRegion: {
    options: PROVIDERS.flatMap((p) => p.regions.map((r) => r.id)),
    control: {
      type: "radio",
      labels: Object.fromEntries(
        PROVIDERS.flatMap((p) =>
          p.regions.map((r) => [r.id, `${p.displayName} - ${r.displayName}`])
        )
      ),
    },
  },
  apiMaxStreamingUnits: {
    control: {
      type: "range",
      min: 0,
      max: 9,
    },
  },
  apiRemainingQuota: {
    control: {
      type: "range",
      min: 0,
      max: 9,
    },
  },
  apiLatency: {
    control: "number",
  },
};

export type StoryProps = {
  apiPlan: "trial" | "standard";
  apiScenario: InstanceAvailability | "backend-error";
  apiSizes: "normal" | "no-sizes" | "error";
  apiProviders: string[];
  apiDefaultProvider: string;
  apiRegionsAvailability: keyof typeof regionsScenario;
  apiMaxStreamingUnits: number;
  apiRemainingQuota: number;
  apiLatency: number;
  onCreate: CreateKafkaInstancePropsWithSizes["onCreate"];
  onClickQuickStart?: () => void;
  onClickKafkaOverview?: () => void;
  onClickContactUs?: () => void;
  onClickLearnMoreAboutRegions?: () => void;
  onLearnHowToAddStreamingUnits?: () => void;
  onLearnMoreAboutSizes?: () => void;
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
  const onCreate: CreateKafkaInstancePropsWithSizes["onCreate"] = (
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
    apiProviders = PROVIDERS.map((p) => p.id),
    apiPlan = "standard",
    apiScenario = "standard-available",
    apiDefaultProvider,
    apiRegionsAvailability = "full",
    apiSizes = "normal",
    apiRemainingQuota = 3,
    apiMaxStreamingUnits = 5,
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

  const getAvailableProvidersAndDefaults =
    apiScenario === "backend-error"
      ? () => apiError<CreateKafkaInitializationData>(undefined, apiLatency)
      : makeAvailableProvidersAndDefaults(
          {
            plan: apiPlan,
            instanceAvailability: apiScenario,
            defaultProvider: apiDefaultProvider,
            providers: apiProviders,
            remainingQuota: apiPlan === "trial" ? 0 : apiRemainingQuota,
            maxStreamingUnits: apiMaxStreamingUnits,
          },
          providers,
          apiLatency
        );

  const getSizes: CreateKafkaInstancePropsWithSizes["getSizes"] = (
    provider
  ) => {
    return apiSizes === "normal"
      ? fakeApi<GetSizesData>(
          {
            ...SIZES[provider],
          },
          apiLatency
        )
      : apiSizes === "no-sizes"
      ? fakeApi<GetSizesData>(
          {
            standard: [],
            trial: {} as Size,
          },
          apiLatency
        )
      : apiError<GetSizesData>(undefined, apiLatency);
  };

  const onClickHandlers = actions(
    "onClickQuickStart",
    "onClickKafkaOverview",
    "onClickContactUs",
    "onClickLearnMoreAboutRegions",
    "onLearnHowToAddStreamingUnits",
    "onLearnMoreAboutSizes"
  );

  return (
    <div style={{ transform: "scale(1)", minHeight: 850, height: "100%" }}>
      <CreateKafkaInstanceWithSizes
        key={JSON.stringify(args)}
        getAvailableProvidersAndDefaults={getAvailableProvidersAndDefaults}
        getSizes={getSizes}
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
        onClickKafkaOverview={
          args.onClickKafkaOverview || onClickHandlers.onClickKafkaOverview
        }
        onClickContactUs={
          args.onClickContactUs || onClickHandlers.onClickContactUs
        }
        onClickLearnMoreAboutRegions={
          args.onClickLearnMoreAboutRegions ||
          onClickHandlers.onClickLearnMoreAboutRegions
        }
        onLearnHowToAddStreamingUnits={
          args.onLearnHowToAddStreamingUnits ||
          onClickHandlers.onLearnHowToAddStreamingUnits
        }
        onLearnMoreAboutSizes={
          args.onLearnMoreAboutSizes || onClickHandlers.onLearnMoreAboutSizes
        }
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
