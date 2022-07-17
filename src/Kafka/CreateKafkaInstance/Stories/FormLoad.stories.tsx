import { CreateKafkaInstance } from "../CreateKafkaInstance";
import type { StoryMeta } from "./storiesHelpers";
import {
  argTypes,
  defaultStoryArgs,
  parameters,
  Template,
} from "./storiesHelpers";

export default {
  component: CreateKafkaInstance,
  args: defaultStoryArgs,
  argTypes,
  parameters,
} as StoryMeta;

export const QuotaAvailableOnFormLoad = Template.bind({});
QuotaAvailableOnFormLoad.storyName = "Quota Available - Standard";

export const TrialAvailableOnFormLoad = Template.bind({});
TrialAvailableOnFormLoad.storyName = "Quota Available - Trial";
TrialAvailableOnFormLoad.args = {
  apiPlan: "trial",
  apiTrialScenario: "available",
};

export const OverQuotaOnFormLoad = Template.bind({});
OverQuotaOnFormLoad.storyName = "Over Quota - Standard";
OverQuotaOnFormLoad.args = {
  apiStandardScenario: "over-quota",
};

export const TrialUnavailableOnFormLoad = Template.bind({});
TrialUnavailableOnFormLoad.storyName = "Trial Unavailable - Trial";
TrialUnavailableOnFormLoad.args = {
  apiPlan: "trial",
  apiTrialScenario: "unavailable",
};

export const TrialUsedOnFormLoad = Template.bind({});
TrialUsedOnFormLoad.storyName = "Over Quota - Trial";
TrialUsedOnFormLoad.args = {
  apiPlan: "trial",
  apiTrialScenario: "used",
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
  apiTrialScenario: "available",
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
  apiStandardScenario: "regions-unavailable",
  apiRegionsAvailability: "regionsDisabled",
};

export const TrialAllRegionsDisabledOnFormLoad = Template.bind({});
TrialAllRegionsDisabledOnFormLoad.storyName = "All regions Unavailable - Trial";
TrialAllRegionsDisabledOnFormLoad.args = {
  apiPlan: "trial",
  apiTrialScenario: "unavailable",
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
  apiSimulateBackendError: true,
};

export const UnableToRetrieveSizes = Template.bind({});
UnableToRetrieveSizes.storyName = "No sizes returned from API - Standard";
UnableToRetrieveSizes.args = {
  apiSizes: "error",
};
UnableToRetrieveSizes.parameters = {
  docs: {
    description: {
      story: `If for any reason we don't get any size at all, we still provide the user with an informative message.`,
    },
  },
};

export const GotEmptySizes = Template.bind({});
GotEmptySizes.storyName = "Empty list of sizes returned from API - Standard";
GotEmptySizes.args = {
  apiSizes: "no-sizes",
};
GotEmptySizes.parameters = {
  docs: {
    description: {
      story: `If for any reason we don't get any size at all, we still provide the user with an informative message.`,
    },
  },
};
