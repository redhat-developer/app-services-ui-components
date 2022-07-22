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

export const PrepaidAndSingleMarketplaceSubscription = Template.bind({});
PrepaidAndSingleMarketplaceSubscription.storyName =
  "User has a single active subscription in a marketplace and pre-paid quota - Standard";
PrepaidAndSingleMarketplaceSubscription.args = {
  apiHasMarketplaceSubscriptions: true,
  apiMarketplacesAWSSubscriptions: 1,
  apiMarketplacesAzure: false,
  apiMarketplacesRH: false,
};
PrepaidAndSingleMarketplaceSubscription.parameters = {
  docs: {
    description: {
      story: `The billing popover should show variant 1, mentioning external marketplaces`,
    },
  },
};

export const PrepaidAndSingleMarketplaceSubscriptionAllRH = Template.bind({});
PrepaidAndSingleMarketplaceSubscriptionAllRH.storyName =
  "User has a single active subscription in RH marketplace and pre-paid quota - Standard";
PrepaidAndSingleMarketplaceSubscriptionAllRH.args = {
  apiHasMarketplaceSubscriptions: true,
  apiMarketplacesAWS: false,
  apiMarketplacesAzure: false,
  apiMarketplacesRH: true,
  apiMarketplacesRHSubscriptions: 1,
};
PrepaidAndSingleMarketplaceSubscriptionAllRH.parameters = {
  docs: {
    description: {
      story: `The billing popover should show variant 2, with no mentions of external marketplaces`,
    },
  },
};

export const PrepaidAndMarketplaceSubscriptions = Template.bind({});
PrepaidAndMarketplaceSubscriptions.storyName =
  "User has multiple active subscriptions in many marketplaces and pre-paid quota - Standard";
PrepaidAndMarketplaceSubscriptions.args = {
  apiHasMarketplaceSubscriptions: true,
};
PrepaidAndMarketplaceSubscriptions.parameters = {
  docs: {
    description: {
      story: ``,
    },
  },
};

export const OnlyMarketplaceSubscriptions = Template.bind({});
OnlyMarketplaceSubscriptions.storyName =
  "User has multiple active subscriptions in many marketplaces and no pre-paid quota - Standard";
OnlyMarketplaceSubscriptions.args = {
  apiRemainingPrepaid: false,
  apiHasMarketplaceSubscriptions: true,
};
OnlyMarketplaceSubscriptions.parameters = {
  docs: {
    description: {
      story: ``,
    },
  },
};

export const SingleMarketplace = Template.bind({});
SingleMarketplace.storyName =
  "User has multiple active subscriptions in a single marketplaces and no pre-paid quota - Standard";
SingleMarketplace.args = {
  apiRemainingPrepaid: false,
  apiHasMarketplaceSubscriptions: true,
  apiMarketplacesAWS: true,
  apiMarketplacesAWSSubscriptions: 2,
  apiMarketplacesAzure: false,
  apiMarketplacesRH: false,
};
SingleMarketplace.parameters = {
  docs: {
    description: {
      story: `Cloud Providers not matching the marketplace for which the user has a subscription are disabled`,
    },
  },
};

export const SingleSubscription = Template.bind({});
SingleSubscription.storyName =
  "User has a single active subscription in a marketplace and no pre-paid quota - Standard";
SingleSubscription.args = {
  apiRemainingPrepaid: false,
  apiHasMarketplaceSubscriptions: true,
  apiMarketplacesAWS: true,
  apiMarketplacesAWSSubscriptions: 1,
  apiMarketplacesAzure: false,
  apiMarketplacesRH: false,
};
SingleSubscription.parameters = {
  docs: {
    description: {
      story: `Cloud Providers not matching the marketplace for which the user has a subscription are disabled`,
    },
  },
};

export const SingleSubscriptionToRH = Template.bind({});
SingleSubscriptionToRH.storyName =
  "User has a single active subscription in Red Hat Marketplace and no pre-paid quota - Standard";
SingleSubscriptionToRH.args = {
  apiRemainingPrepaid: false,
  apiHasMarketplaceSubscriptions: true,
  apiMarketplacesAWS: false,
  apiMarketplacesAzure: false,
  apiMarketplacesRH: true,
};
SingleSubscriptionToRH.parameters = {
  docs: {
    description: {
      story: `All Cloud Providers are available`,
    },
  },
};
