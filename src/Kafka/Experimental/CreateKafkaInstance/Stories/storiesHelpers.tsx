import { Button } from "@patternfly/react-core";
import { PlayFunction } from "@storybook/csf";
import { ComponentStory } from "@storybook/react";
import { ReactFramework } from "@storybook/react/types-6-0";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";
import { fakeApi } from "../../../../shared/storiesHelpers";
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
      ingressEgress: 3,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
    },
    {
      id: "x2",
      streamingUnits: 2,
      ingressEgress: 30,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
    },
    {
      id: "x3",
      streamingUnits: 5,
      ingressEgress: 300,
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
      ingressEgress: 3,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
    },
    {
      id: "x2",
      streamingUnits: 9,
      ingressEgress: 30,
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
  allProviders = PROVIDERS
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

  return async (): Promise<CreateKafkaInitializationData> => {
    return {
      defaultProvider,
      defaultAZ,
      availableProviders,
      instanceAvailability,
      defaultRegion,
      maxStreamingUnits,
      remainingStreamingUnits,
    };
  };
}

const regionsScenario = {
  full: "All regions available",
  oneProviderUnavailable: "One provider with no available regions",
  someRegionsUnavailable: "Some regions disabled for all providers",
  regionsUnavailable: "All regions disabled for all providers",
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
    apiScenario = "quota" as InstanceAvailability,
    apiDefaultProvider = PROVIDERS[0].id,
    apiDefaultRegion = PROVIDERS[0].regions[0].id,
    apiRegionsAvailability = "full",
    apiRemainingStreamingUnits = 3,
    apiMaxStreamingUnits = 5,
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
      : PROVIDERS.map((p) => ({
          ...p,
          regions: p.regions.map((r) => ({ ...r, isDisabled: true })),
        }));

  const getAvailableProvidersAndDefaults = makeAvailableProvidersAndDefaults(
    {
      instanceAvailability: apiScenario,
      defaultAZ: "multi",
      defaultProvider: apiDefaultProvider,
      defaultRegion: apiDefaultRegion,
      providers: apiProviders,
      remainingStreamingUnits: apiRemainingStreamingUnits,
      maxStreamingUnits: apiMaxStreamingUnits,
    },
    providers
  );

  const getSizes: CreateKafkaInstanceProps["getSizes"] = (provider, region) => {
    console.log("getSizes", provider, region);
    return fakeApi<GetSizesData>(
      {
        sizes: SIZES[provider],
      },
      500
    );
  };

  return (
    <div style={{ transform: "scale(1)", minHeight: 850, height: "100%" }}>
      <CreateKafkaInstance
        key={JSON.stringify(args)}
        {...args}
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

  await userEvent.type(await canvas.findByLabelText("Name *"), "instance-name");

  const regionSelect = await canvas.findByText("Select region");
  await userEvent.click(regionSelect);
  await userEvent.click(await canvas.findByText("EU, Ireland"));

  await userEvent.click(
    await canvas.findByTestId("modalCreateKafka-buttonSubmit")
  );
};
