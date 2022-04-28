import { Button } from "@patternfly/react-core";
import { actions } from "@storybook/addon-actions";
import { PlayFunction } from "@storybook/csf";
import { expect } from "@storybook/jest";
import { ComponentStory } from "@storybook/react";
import { ReactFramework } from "@storybook/react/types-6-0";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { useState } from "react";
import { apiError, fakeApi } from "../../../../shared/storiesHelpers";
import {
  CreateKafkaInstance,
  CreateKafkaInstanceProps,
} from "../CreateKafkaInstance";
import {
  AZ,
  CreateKafkaInitializationData,
  GetSizesData,
  InstanceAvailability,
  Provider,
  ProviderInfo,
  Providers,
  Region,
  Size,
} from "../types";

export const AWS: ProviderInfo = {
  id: "aws",
  displayName: "Amazon Web Services",
  regions: [
    { id: "eu-west-1", displayName: "EU, Ireland" },
    {
      id: "us-east-1",
      displayName: "US East, N. Virginia",
    },
  ],
  AZ: {
    multi: true,
    single: false,
  },
};

export const AZURE: ProviderInfo = {
  id: "azure",
  displayName: "Microsoft Azure",
  regions: [
    {
      id: "australiaeast",
      displayName: "Australia East",
    },
    {
      id: "europenorth",
      displayName: "Europe North",
    },
  ],
  AZ: {
    multi: true,
    single: false,
  },
};

export const PROVIDERS: Providers = [AWS, AZURE];

const SIZES: { [key: string]: Size[] } = {
  aws: [
    {
      id: "x1",
      streamingUnits: 1,
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
    },
    {
      id: "x2",
      streamingUnits: 2,
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
    },
    {
      id: "x3",
      streamingUnits: 5,
      ingress: 300,
      egress: 3001,
      storage: 500,
      connections: 600,
      connectionRate: 700,
      maxPartitions: 800,
      messageSize: 900,
    },
  ],
  azure: [
    {
      id: "x1",
      streamingUnits: 3,
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
    },
    {
      id: "x2",
      streamingUnits: 9,
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
    },
  ],
};

export function makeAvailableProvidersAndDefaults(
  options: {
    instanceAvailability: InstanceAvailability;
    defaultAZ: AZ | undefined;
    defaultProvider: Provider | undefined;
    defaultRegion?: Region;
    providers: string[];
    maxStreamingUnits: number;
    remainingStreamingUnits: number;
  },
  allProviders = PROVIDERS,
  latency = 500
): () => Promise<CreateKafkaInitializationData> {
  const {
    instanceAvailability,
    defaultProvider,
    defaultAZ,
    providers,
    defaultRegion,
    maxStreamingUnits,
    remainingStreamingUnits,
  } = options;
  const availableProviders = allProviders.filter((p) =>
    providers.includes(p.id)
  );

  return () =>
    fakeApi<CreateKafkaInitializationData>(
      {
        defaultProvider,
        defaultAZ,
        availableProviders,
        instanceAvailability,
        defaultRegion,
        maxStreamingUnits,
        remainingStreamingUnits,
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
  apiScenario: {
    description: "Subscription type",
    control: "radio",
    options: [
      "quota",
      "trial",
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
  apiRemainingStreamingUnits: {
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

export const parameters = {
  controls: { include: /^api/ },
};

export const Template: ComponentStory<typeof CreateKafkaInstance> = (
  args,
  { id }
) => {
  console.table(args);
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
    apiProviders = PROVIDERS.map((p) => p.id),
    apiScenario = "quota",
    apiDefaultProvider,
    apiDefaultRegion,
    apiRegionsAvailability = "full",
    apiRemainingStreamingUnits = 3,
    apiMaxStreamingUnits = 5,
    apiLatency = 500,
  } = args as { [key: string]: any };

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
            instanceAvailability: apiScenario,
            defaultAZ: apiScenario === "trial" ? "single" : "multi",
            defaultProvider: apiDefaultProvider,
            defaultRegion: apiDefaultRegion,
            providers: apiProviders,
            remainingStreamingUnits: apiRemainingStreamingUnits,
            maxStreamingUnits: apiMaxStreamingUnits,
          },
          providers,
          apiLatency
        );

  const getSizes: CreateKafkaInstanceProps["getSizes"] = (provider, region) => {
    console.log("getSizes", provider, region);
    return fakeApi<GetSizesData>(
      {
        sizes: SIZES[provider],
      },
      apiLatency
    );
  };

  return (
    <div style={{ transform: "scale(1)", minHeight: 850, height: "100%" }}>
      <CreateKafkaInstance
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
        {...actions(
          "onClickQuickStart",
          "onClickKafkaOverview",
          "onClickContactUs",
          "onClickLearnMoreAboutRegions",
          "onLearnHowToAddStreamingUnits",
          "onLearnMoreAboutSizes"
        )}
      />
      <div>
        <Button onClick={() => onOpenModal()}>Open modal</Button>
      </div>
    </div>
  );
};

export const sampleSubmit: PlayFunction<
  ReactFramework,
  CreateKafkaInstanceProps
> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => expect(canvas.getByLabelText("Name *")).toBeEnabled());

  await userEvent.type(await canvas.findByLabelText("Name *"), "instance-name");

  const regionSelect = await canvas.findByText("Cloud region");
  await userEvent.click(regionSelect);
  await userEvent.click(await canvas.findByText("US East, N. Virginia"));

  await waitFor(() =>
    expect(canvas.getByTestId("size-slider")).toBeInTheDocument()
  );
  await userEvent.click(
    await canvas.findByTestId("modalCreateKafka-buttonSubmit")
  );
};
