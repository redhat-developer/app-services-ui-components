import { Button } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";
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
import { PlayFunction } from "@storybook/csf";
import { ReactFramework } from "@storybook/react/types-6-0";

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
    isTesting: true,
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
    <div id={id} style={{ transform: "scale(1)", minHeight: 850 }}>
      <CreateKafkaInstance
        {...args}
        appendTo={() => document.getElementById(id) || document.body}
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

const sampleSubmit: PlayFunction<
  ReactFramework,
  CreateKafkaInstanceProps
> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(await canvas.findByLabelText("Name *"), "instance-name");
  await userEvent.selectOptions(
    await canvas.findByLabelText("Cloud region *"),
    "eu-west-1"
  );
  await userEvent.click(
    await canvas.findByTestId("modalCreateKafka-buttonSubmit")
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

export const SomeRegionsDisabledOnFormLoad = Template.bind({});
SomeRegionsDisabledOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      instanceAvailability: "quota",
      defaultAZ: "multi",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
    },
    PROVIDERS.map((p) => ({
      ...p,
      regions: p.regions.map((r, idx) => ({ ...r, isDisabled: idx === 0 })),
    }))
  ),
} as CreateKafkaInstanceProps;
SomeRegionsDisabledOnFormLoad.parameters = {
  docs: {
    description: {
      story: `Some regions could be disabled because they can't accept new instances, but we still want to show them
      in the list in a disabled state.`,
    },
  },
};

export const AllRegionsDisabledOnFormLoad = Template.bind({});
AllRegionsDisabledOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      instanceAvailability: "quota",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
      defaultAZ: "multi",
    },
    PROVIDERS.map((p) => ({
      ...p,
      regions: p.regions.map((r) => ({ ...r, isDisabled: true })),
    }))
  ),
} as CreateKafkaInstanceProps;

export const NoRegionsReturnedFromApiForAProviderOnFormLoad = Template.bind({});
NoRegionsReturnedFromApiForAProviderOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      instanceAvailability: "quota",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
      defaultAZ: "multi",
    },
    PROVIDERS.map((p, idx) =>
      idx === 0
        ? {
            ...p,
            regions: [],
          }
        : { ...p }
    )
  ),
} as CreateKafkaInstanceProps;
NoRegionsReturnedFromApiForAProviderOnFormLoad.parameters = {
  docs: {
    description: {
      story: `If a provider doesn't have any region, it will still be displayed but the regions select will contain an 
      unselectable information message.`,
    },
  },
};

export const NoRegionsReturnedFromApiOnFormLoad = Template.bind({});
NoRegionsReturnedFromApiOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      instanceAvailability: "quota",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
      defaultAZ: "multi",
    },
    PROVIDERS.map((p) => ({
      ...p,
      regions: [],
    }))
  ),
} as CreateKafkaInstanceProps;
NoRegionsReturnedFromApiOnFormLoad.parameters = {
  docs: {
    description: {
      story: `If for any reason we don't get any region at all, we still provide the user with an informative message.`,
    },
  },
};

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
    instanceAvailability: "quota",
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
