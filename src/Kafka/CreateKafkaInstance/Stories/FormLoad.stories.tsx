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
  apiPlan: "developer",
  apiTrialScenario: "available",
};

export const OutOfQuotaOnFormLoad = Template.bind({});
OutOfQuotaOnFormLoad.storyName = "Out of Quota - Standard";
OutOfQuotaOnFormLoad.args = {
  apiStandardScenario: "out-of-quota",
};

export const TrialUnavailableOnFormLoad = Template.bind({});
TrialUnavailableOnFormLoad.storyName = "Trial Unavailable - Trial";
TrialUnavailableOnFormLoad.args = {
  apiPlan: "developer",
  apiTrialScenario: "unavailable",
};

export const TrialUsedOnFormLoad = Template.bind({});
TrialUsedOnFormLoad.storyName = "Over Quota - Trial";
TrialUsedOnFormLoad.args = {
  apiPlan: "developer",
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
  apiPlan: "developer",
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
  apiPlan: "developer",
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
  "User has prepaid quota, a single active subscription in a marketplace";
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
  "User has prepaid quota, a single active subscription in RH marketplace";
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
  "User has prepaid quota, multiple active subscriptions in many marketplaces";
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

export const MarketplaceSubscriptionsAndPrepaidOutOfQuota = Template.bind({});
MarketplaceSubscriptionsAndPrepaidOutOfQuota.storyName =
  "User has out of quota prepaid option, multiple active subscriptions in many marketplaces";
MarketplaceSubscriptionsAndPrepaidOutOfQuota.args = {
  apiHasMarketplaceSubscriptions: true,
  apiRemainingPrepaidQuota: 0,
};
MarketplaceSubscriptionsAndPrepaidOutOfQuota.parameters = {
  docs: {
    description: {
      story: ``,
    },
  },
};

export const PrepaidAndMarketplaceSubscriptionsOutOfQuota = Template.bind({});
PrepaidAndMarketplaceSubscriptionsOutOfQuota.storyName =
  "User has prepaid quota, out of quota multiple active subscriptions in many marketplaces";
PrepaidAndMarketplaceSubscriptionsOutOfQuota.args = {
  apiHasMarketplaceSubscriptions: true,
  apiRemainingMarketplaceQuota: 0,
};
PrepaidAndMarketplaceSubscriptionsOutOfQuota.parameters = {
  docs: {
    description: {
      story: ``,
    },
  },
};

export const OnlyMarketplaceSubscriptions = Template.bind({});
OnlyMarketplaceSubscriptions.storyName =
  "User has no prepaid quota, multiple active subscriptions in many marketplaces";
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
  "User has no prepaid quota, multiple active subscriptions in a single marketplaces";
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

export const SingleMarketplaceRH = Template.bind({});
SingleMarketplaceRH.storyName =
  "User has no prepaid quota, multiple active subscriptions in RH marketplaces";
SingleMarketplaceRH.args = {
  apiRemainingPrepaid: false,
  apiHasMarketplaceSubscriptions: true,
  apiMarketplacesAWS: false,
  apiMarketplacesAzure: false,
  apiMarketplacesRH: true,
  apiMarketplacesRHSubscriptions: 2,
};
SingleMarketplaceRH.parameters = {
  docs: {
    description: {
      story: `All Cloud Providers should be enabled`,
    },
  },
};

export const SingleSubscription = Template.bind({});
SingleSubscription.storyName =
  "User has no prepaid quota, a single active subscription in a marketplace";
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
  "User has no prepaid quota, a single active subscription in Red Hat Marketplace";
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
