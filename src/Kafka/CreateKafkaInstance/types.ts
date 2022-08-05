export type CloudProvider = "aws" | "azure";
export type Region = string;
export type RegionInfo = {
  id: Region;
  displayName: string;
  isDisabled: boolean;
};
export type AZ = "single" | "multi";
export type CloudProviderInfo = {
  id: CloudProvider;
  displayName: string;
  regions: Array<RegionInfo>;
  defaultRegion?: Region;
};
export type Regions = Array<RegionInfo>;
export type CloudProviders = Array<CloudProviderInfo>;
export type Quota = number;
export type MarketPlace = CloudProvider | "rhm";
export type MarketPlaceSubscriptions = {
  marketplace: MarketPlace;
  subscriptions: string[];
};

export type SelectedSubscription = {
  marketplace: MarketPlace;
  subscription: string;
};

export type Size = {
  id: string;
  displayName: string;
  status: "stable" | "preview";
  quota: Quota;
  ingress: number;
  egress: number;
  storage: number;
  connections: number;
  connectionRate: number;
  maxPartitions: number;
  messageSize: number;
  isDisabled: boolean;
};

export type CreateKafkaInstanceError =
  | "insufficient-quota"
  | "name-taken"
  | "developer-unavailable"
  | "region-unavailable"
  | "unknown";

export type StandardPlanAvailability =
  | "available"
  | "out-of-quota"
  | "instance-unavailable"
  | "regions-unavailable";

export type TrialPlanAvailability = "available" | "used" | "unavailable";

export type StandardPlanInitializationData = {
  defaultProvider: CloudProvider | undefined;
  availableProviders: CloudProviders;
  instanceAvailability: StandardPlanAvailability;
  remainingPrepaidQuota: Quota | undefined;
  remainingMarketplaceQuota: Quota | undefined;
  marketplaceSubscriptions: MarketPlaceSubscriptions[];
  plan: "standard";
};

export type TrialPlanInitializationData = {
  defaultProvider: CloudProvider | undefined;
  availableProviders: CloudProviders;
  instanceAvailability: TrialPlanAvailability;
  plan: "developer";
};

export type CreateKafkaInitializationData =
  | StandardPlanInitializationData
  | TrialPlanInitializationData;

export type StandardSizes = Size[];

export type TrialSizes = {
  standard: Size[];
  trial: Size & {
    trialDurationHours: number;
  };
};

export type CreateKafkaFormData = {
  plan: "standard" | "developer";
  name: string;
  provider: CloudProvider;
  region: Region;
  sizeId: string;
  billing: SelectedSubscription | "prepaid" | undefined;
};
