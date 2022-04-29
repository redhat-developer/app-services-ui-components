import { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance } from "../../CreateKafkaInstance";
import { argTypes, parameters, PROVIDERS, Template } from "../storiesHelpers";

export default {
  component: CreateKafkaInstance,
  args: {
    apiPlan: "standard",
    apiScenario: "standard-available",
    apiProviders: PROVIDERS.map((p) => p.id),
    apiDefaultProvider: "aws",
    apiRegionsAvailability: "full",
    apiMaxStreamingUnits: 5,
    apiRemainingStreamingUnits: 3,
    apiLatency: 500,
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateKafkaInstance>;

export const QuotaAvailableOnFormLoad = Template.bind({});
QuotaAvailableOnFormLoad.storyName = "Quota Available - Standard";

export const TrialAvailableOnFormLoad = Template.bind({});
TrialAvailableOnFormLoad.storyName = "Quota Available - Trial";
TrialAvailableOnFormLoad.args = {
  apiPlan: "trial",
  apiScenario: "trial-available",
};

export const OverQuotaOnFormLoad = Template.bind({});
OverQuotaOnFormLoad.storyName = "Over Quota - Standard";
OverQuotaOnFormLoad.args = {
  apiScenario: "over-quota",
};

export const TrialUnavailableOnFormLoad = Template.bind({});
TrialUnavailableOnFormLoad.storyName = "Trial Unavailable - Trial";
TrialUnavailableOnFormLoad.args = {
  apiPlan: "trial",
  apiScenario: "trial-unavailable",
};

export const TrialUsedOnFormLoad = Template.bind({});
TrialUsedOnFormLoad.storyName = "Over Quota - Trial";
TrialUsedOnFormLoad.args = {
  apiPlan: "trial",
  apiScenario: "trial-used",
};

export const SomeRegionsDisabledOnFormLoad = Template.bind({});
SomeRegionsDisabledOnFormLoad.storyName = "Some regions disabled - Standard";
SomeRegionsDisabledOnFormLoad.args = {
  apiRegionsAvailability: "someRegionsUnavailable",
};
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
  apiPlan: "trial",
  apiScenario: "trial-available",
  apiRegionsAvailability: "someRegionsUnavailable",
};
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
  apiRegionsAvailability: "regionsDisabled",
};

export const TrialAllRegionsDisabledOnFormLoad = Template.bind({});
TrialAllRegionsDisabledOnFormLoad.storyName = "All regions Unavailable - Trial";
TrialAllRegionsDisabledOnFormLoad.args = {
  apiPlan: "trial",
  apiScenario: "trial-available",
  apiRegionsAvailability: "regionsDisabled",
};

export const NoRegionsReturnedFromApiForAProviderOnFormLoad = Template.bind({});
NoRegionsReturnedFromApiForAProviderOnFormLoad.storyName =
  "No regions returned from API for a provider - Standard";
NoRegionsReturnedFromApiForAProviderOnFormLoad.args = {
  apiRegionsAvailability: "regionsMissingForOneProvider",
};
NoRegionsReturnedFromApiForAProviderOnFormLoad.parameters = {
  docs: {
    description: {
      story: `If a provider doesn't have any region, it will still be displayed but the regions select will contain an 
      unselectable information message.`,
    },
  },
};

export const NoRegionsReturnedFromApiOnFormLoad = Template.bind({});
NoRegionsReturnedFromApiOnFormLoad.storyName =
  "No regions returned from API - Standard";
NoRegionsReturnedFromApiOnFormLoad.args = {
  apiRegionsAvailability: "regionsMissing",
};
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
  apiScenario: "backend-error",
};
