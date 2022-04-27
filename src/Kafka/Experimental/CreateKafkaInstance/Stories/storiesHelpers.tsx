import { Button } from "@patternfly/react-core";
import { PlayFunction } from "@storybook/csf";
import { ComponentStory } from "@storybook/react";
import { ReactFramework } from "@storybook/react/types-6-0";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";
import {
  CreateKafkaInstance,
  CreateKafkaInstanceProps,
} from "../CreateKafkaInstance";
import {
  AZ,
  CreateKafkaInitializationData,
  InstanceAvailability,
  Provider,
  ProviderInfo,
  Providers,
  Region,
} from "../machines";

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
  ],
  AZ: {
    multi: true,
    single: false,
  },
};

export const PROVIDERS: Providers = [AWS, AZURE];

export function makeAvailableProvidersAndDefaults(
  options: {
    instanceAvailability: InstanceAvailability;
    defaultAZ: AZ | undefined;
    defaultProvider: Provider | undefined;
    defaultRegion?: Region;
    providers: string[];
    maxStreamingUnits?: number;
    remainingStreamingUnits?: number;
  },
  allProviders = PROVIDERS
): () => Promise<CreateKafkaInitializationData> {
  const {
    instanceAvailability,
    defaultProvider,
    defaultAZ,
    providers,
    defaultRegion,
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
    };
  };
}

export const Template: ComponentStory<typeof CreateKafkaInstance> = (
  args,
  { id }
) => {
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

  return (
    <div style={{ transform: "scale(1)", minHeight: 850, height: "100%" }}>
      <CreateKafkaInstance
        {...args}
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
