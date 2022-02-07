import { Button } from "@patternfly/react-core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import React, { useState } from "react";
import {
  CreateKafkaInstance,
  CreateKafkaInstanceProps,
} from "./CreateKafkaInstance";
import {
  AZ,
  CreateKafkaInitializationData,
  InstanceAvailability,
  Provider,
  ProviderInfo,
  Providers,
} from "./machines";

const AWS: ProviderInfo = {
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

const AZURE: ProviderInfo = {
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

const PROVIDERS: Providers = [AWS, AZURE];

export default {
  component: CreateKafkaInstance,
  args: {
    getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
      instanceAvailability: "quota",
      defaultAZ: "multi",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
    }),
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
} as ComponentMeta<typeof CreateKafkaInstance>;

const Template: ComponentStory<typeof CreateKafkaInstance> = (args, { id }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  const onOpenModal = () => {
    setIsModalOpen(true);
  };
  const onCreate = (data, onSuccess, onFailure) => {
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
    <div id={id} style={{ transform: "scale(1)", minHeight: 850 }}>
      <CreateKafkaInstance
        {...args}
        appendTo={() => document.getElementById(id)}
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

export const Default = Template.bind({});
Default.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: "aws",
    providers: ["aws"],
    instanceAvailability: "quota",
    defaultAZ: "multi",
  }),
};

export const LoadingData = Template.bind({});
LoadingData.args = {
  getAvailableProvidersAndDefaults: async () => {
    return new Promise(() => {
      // never resolve to simulate loading
    });
  },
} as CreateKafkaInstanceProps;

export const QuotaAvailableOnFormLoad = Template.bind({});

export const TrialAvailableOnFormLoad = Template.bind({});
TrialAvailableOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "trial",
    defaultAZ: "multi",
    defaultProvider: "",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const OverQuotaOnFormLoad = Template.bind({});
OverQuotaOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "over-quota",
    defaultAZ: "multi",
    defaultProvider: "",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const OverQuotaOnFormSubmit = Template.bind({});
OverQuotaOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("over-quota"),
} as CreateKafkaInstanceProps;
OverQuotaOnFormSubmit.play = sampleSubmit;

export const TrialUnavailableOnFormLoad = Template.bind({});
TrialUnavailableOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "trial-unavailable",
    defaultAZ: "multi",
    defaultProvider: "",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const TrialUnavailableOnFormSubmit = Template.bind({});
TrialUnavailableOnFormSubmit.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "trial",
    defaultAZ: "multi",
    defaultProvider: "aws",
    providers: ["aws", "azure"],
  }),
  onCreate: (_data, _onSuccess, onError) => onError("trial-unavailable"),
} as CreateKafkaInstanceProps;
TrialUnavailableOnFormSubmit.play = sampleSubmit;

export const TrialUsedOnFormLoad = Template.bind({});
TrialUsedOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "trial-used",
    defaultAZ: "multi",
    defaultProvider: "",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const ErrorOnFormLoad = Template.bind({});
ErrorOnFormLoad.args = {
  getAvailableProvidersAndDefaults: async () => {
    return Promise.reject();
  },
} as CreateKafkaInstanceProps;

export const CreationInProgress = Template.bind({});
CreationInProgress.args = {
  onCreate: () => {
    // Doing nothing to showcase the loading
  },
};
CreationInProgress.play = sampleSubmit;

export const NameTakenOnFormSubmit = Template.bind({});
NameTakenOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("name-taken"),
} as CreateKafkaInstanceProps;
NameTakenOnFormSubmit.play = sampleSubmit;

export const GenericErrorOnFormSubmit = Template.bind({});
GenericErrorOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("unknown"),
} as CreateKafkaInstanceProps;
GenericErrorOnFormSubmit.play = sampleSubmit;

export const FormErrorsCantSubmit = Template.bind({});
FormErrorsCantSubmit.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: undefined,
    defaultAZ: undefined,
    instanceAvailability: "quota",
    providers: ["aws", "azure"],
  }),
};
FormErrorsCantSubmit.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(await canvas.findByLabelText("Name *"), "%3-foo-;");
  await userEvent.selectOptions(
    await canvas.findByLabelText("Cloud region *"),
    ""
  );
  await userEvent.click(
    await canvas.findByTestId("modalCreateKafka-buttonSubmit")
  );
};

export const VariantCanCustomizeDefaultProvider = Template.bind({});
VariantCanCustomizeDefaultProvider.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: "azure",
    instanceAvailability: "trial",
    defaultAZ: "multi",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const VariantSingleProvider = Template.bind({});
VariantSingleProvider.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: "aws",
    providers: ["aws"],
    instanceAvailability: "quota",
    defaultAZ: "multi",
  }),
} as CreateKafkaInstanceProps;

export const VariantBothAvailabilityZonesEnabledWithNoTooltip = Template.bind(
  {}
);
VariantBothAvailabilityZonesEnabledWithNoTooltip.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      defaultProvider: "aws",
      providers: ["aws"],
      instanceAvailability: "quota",
      defaultAZ: "multi",
    },
    PROVIDERS.map((p) => ({ ...p, AZ: { multi: true, single: true } }))
  ),
} as CreateKafkaInstanceProps;

export const VariantOnlySingleAZEnabledWithRightTooltip = Template.bind({});
VariantOnlySingleAZEnabledWithRightTooltip.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      defaultProvider: "aws",
      providers: ["aws"],
      instanceAvailability: "quota",
      defaultAZ: "single",
    },
    PROVIDERS.map((p) => ({ ...p, AZ: { multi: false, single: true } }))
  ),
} as CreateKafkaInstanceProps;

export const VariantBothAZEnabledWithRightTooltip = Template.bind({});
VariantBothAZEnabledWithRightTooltip.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      defaultProvider: "aws",
      providers: ["aws"],
      instanceAvailability: "quota",
      defaultAZ: "single",
    },
    PROVIDERS.map((p) => ({ ...p, AZ: { multi: true, single: true } }))
  ),
} as CreateKafkaInstanceProps;

export const VariantNoDefaultsRequired = Template.bind({});
VariantNoDefaultsRequired.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      defaultProvider: undefined,
      defaultAZ: undefined,
      instanceAvailability: "quota",
      providers: ["aws", "azure"],
    },
    PROVIDERS.map((p, idx) => ({
      ...p,
      AZ: { multi: idx % 2 === 0, single: idx % 2 !== 0 },
    }))
  ),
} as CreateKafkaInstanceProps;

function makeAvailableProvidersAndDefaults(
  options: {
    instanceAvailability: InstanceAvailability;
    defaultAZ: AZ | undefined;
    defaultProvider: Provider | undefined;
    providers: string[];
  },
  allProviders = PROVIDERS
): () => Promise<CreateKafkaInitializationData> {
  const { instanceAvailability, defaultProvider, defaultAZ, providers } =
    options;
  const availableProviders = allProviders.filter((p) =>
    providers.includes(p.id)
  );

  return async (): Promise<CreateKafkaInitializationData> => {
    return {
      defaultProvider,
      defaultAZ,
      availableProviders,
      instanceAvailability,
    };
  };
}

async function sampleSubmit({ canvasElement }) {
  const canvas = within(canvasElement);

  await userEvent.type(await canvas.findByLabelText("Name *"), "instance-name");
  await userEvent.selectOptions(
    await canvas.findByLabelText("Cloud region *"),
    "eu-west-1"
  );
  await userEvent.click(
    await canvas.findByTestId("modalCreateKafka-buttonSubmit")
  );
}
