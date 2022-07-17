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
export type MarketPlace = CloudProvider | "rh";
export type MarketPlaceSubscriptions = {
  marketplace: MarketPlace;
  subscriptions: string[];
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
  | "over-quota"
  | "name-taken"
  | "trial-unavailable"
  | "region-unavailable"
  | "unknown";

export type StandardPlanAvailability =
  | "available"
  | "over-quota"
  | "instance-unavailable"
  | "regions-unavailable";

export type TrialPlanAvailability = "available" | "used" | "unavailable";

export type StandardPlanInitializationData = {
  defaultProvider: CloudProvider | undefined;
  availableProviders: CloudProviders;
  instanceAvailability: StandardPlanAvailability;
  remainingPrepaidQuota: Quota | undefined;
  remainingMarketplaceQuota: Quota | undefined;
  marketplacesQuota: MarketPlaceSubscriptions[];
  plan: "standard";
};

export type TrialPlanInitializationData = {
  defaultProvider: CloudProvider | undefined;
  availableProviders: CloudProviders;
  instanceAvailability: TrialPlanAvailability;
  plan: "trial";
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
  name: string;
  provider: CloudProvider;
  region: Region;
  sizeId: string;
};

export type CreateKafkaInstanceServices = {
  getAvailableProvidersAndDefaults: () => Promise<CreateKafkaInitializationData>;
  getStandardSizes: (
    provider: CloudProvider,
    region: Region
  ) => Promise<StandardSizes>;
  getTrialSizes: (
    provider: CloudProvider,
    region: Region
  ) => Promise<TrialSizes>;
  onCreate: (
    data: CreateKafkaFormData,
    onSuccess: () => void,
    onError: (error: CreateKafkaInstanceError) => void
  ) => void;
};
