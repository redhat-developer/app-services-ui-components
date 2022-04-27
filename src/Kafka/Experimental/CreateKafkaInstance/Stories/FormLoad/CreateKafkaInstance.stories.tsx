import { ComponentMeta } from "@storybook/react";
import {
  CreateKafkaInstance,
  CreateKafkaInstanceProps,
} from "../../CreateKafkaInstance";
import {
  makeAvailableProvidersAndDefaults,
  PROVIDERS,
  Template,
} from "../storiesHelpers";

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

export const Default = Template.bind({});
Default.storyName = "Standard";
Default.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: "aws",
    providers: ["aws"],
    instanceAvailability: "quota",
    defaultAZ: "multi",
    defaultRegion: "eu-west-1",
  }),
};

export const QuotaAvailableOnFormLoad = Template.bind({});
QuotaAvailableOnFormLoad.storyName = "Quota Available - Standard";
QuotaAvailableOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: "aws",
    providers: ["aws", "azure"],
    instanceAvailability: "quota",
    defaultAZ: "multi",
  }),
};

export const TrialAvailableOnFormLoad = Template.bind({});
TrialAvailableOnFormLoad.storyName = "Quota Available - Trial";
TrialAvailableOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "trial",
    defaultAZ: "multi",
    defaultProvider: "",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const OverQuotaOnFormLoad = Template.bind({});
OverQuotaOnFormLoad.storyName = "Over Quota - Standard";
OverQuotaOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "over-quota",
    defaultAZ: "multi",
    defaultProvider: "",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const TrialUnavailableOnFormLoad = Template.bind({});
TrialUnavailableOnFormLoad.storyName = "Trial Unavailable - Trial";
TrialUnavailableOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "trial-unavailable",
    defaultAZ: "multi",
    defaultProvider: "",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const TrialUsedOnFormLoad = Template.bind({});
TrialUsedOnFormLoad.storyName = "Over Quota - Trial";
TrialUsedOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    instanceAvailability: "trial-used",
    defaultAZ: "multi",
    defaultProvider: "",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const SomeRegionsDisabledOnFormLoad = Template.bind({});
SomeRegionsDisabledOnFormLoad.storyName = "Some regions disabled - Standard";
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

export const TrialSomeRegionsDisabledOnFormLoad = Template.bind({});
TrialSomeRegionsDisabledOnFormLoad.storyName = "Some regions disabled - Trial";
TrialSomeRegionsDisabledOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      instanceAvailability: "trial",
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
TrialSomeRegionsDisabledOnFormLoad.parameters = {
  docs: {
    description: {
      story: `Some regions could be disabled because they can't accept new instances, but we still want to show them
      in the list in a disabled state.`,
    },
  },
};

export const AllRegionsDisabledOnFormLoad = Template.bind({});
AllRegionsDisabledOnFormLoad.storyName = "All Regions Unavailable - Standard";
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

export const TrialAllRegionsDisabledOnFormLoad = Template.bind({});
TrialAllRegionsDisabledOnFormLoad.storyName = "All regions Unavailable - Trial";
TrialAllRegionsDisabledOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      instanceAvailability: "trial",
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
NoRegionsReturnedFromApiForAProviderOnFormLoad.storyName =
  "No regions returned from API for a provider - Standard";
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

export const NoRegionsReturnedFromApiForAllProviderOnFormLoad = Template.bind(
  {}
);
NoRegionsReturnedFromApiForAllProviderOnFormLoad.storyName =
  "No regions returned from API for all providers - Standard";
NoRegionsReturnedFromApiForAllProviderOnFormLoad.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      instanceAvailability: "regions-unavailable",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
      defaultAZ: "multi",
    },
    PROVIDERS.map((p) => ({ ...p, regions: [] }))
  ),
} as CreateKafkaInstanceProps;
NoRegionsReturnedFromApiForAllProviderOnFormLoad.parameters = {
  docs: {
    description: {
      story: `If all provider doesn't have any region, form will be disabled.`,
    },
  },
};

export const NoRegionsReturnedFromApiOnFormLoad = Template.bind({});
NoRegionsReturnedFromApiOnFormLoad.storyName =
  "No regions returned from API - Standard";
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
ErrorOnFormLoad.storyName = "Generic Error";
ErrorOnFormLoad.args = {
  getAvailableProvidersAndDefaults: async () => {
    return Promise.reject();
  },
} as CreateKafkaInstanceProps;
