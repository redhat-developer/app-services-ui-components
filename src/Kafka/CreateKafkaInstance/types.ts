export type StandardPlanAvailability =
  | "available"
  | "over-quota"
  | "instance-unavailable"
  | "regions-unavailable";

export type TrialPlanAvailability =
  | "available"
  | "trial-used"
  | "trial-unavailable";

export type Provider = "aws";
export type Region = string;
export type RegionInfo = {
  id: Region;
  displayName: string;
  isDisabled: boolean;
};
export type AZ = "single" | "multi";
export type ProviderInfo = {
  id: Provider;
  displayName: string;
  regions: Array<RegionInfo>;
  defaultRegion?: Region;
};
export type Regions = Array<RegionInfo>;
export type Providers = Array<ProviderInfo>;
export type Size = {
  id: string;
  displayName: string;
  status: "stable" | "preview";
  quota: number;
  ingress: number;
  egress: number;
  storage: number;
  connections: number;
  connectionRate: number;
  maxPartitions: number;
  messageSize: number;
  trialDurationHours: number | undefined;
  isDisabled: boolean;
};

export type CreateKafkaInstanceError =
  | "over-quota"
  | "name-taken"
  | "trial-unavailable"
  | "region-unavailable"
  | "unknown";

export type StandardPlanInitializationData = {
  defaultProvider: Provider | undefined;
  availableProviders: Providers;
  instanceAvailability: StandardPlanAvailability;
  remainingPrepaidQuota: number;
  marketplacesQuota: { provider: Provider; quota: number };
  plan: "standard";
};

export type TrialPlanInitializationData = {
  defaultProvider: Provider | undefined;
  availableProviders: Providers;
  instanceAvailability: TrialPlanAvailability;
  plan: "trial";
};

export type CreateKafkaInitializationData =
  | StandardPlanInitializationData
  | TrialPlanInitializationData;

export type StandardSizes = Size[];

export type TrialSizes = {
  standard: Size[];
  trial: Size;
};

export type CreateKafkaFormData = {
  name: string;
  provider: Provider;
  region: Region;
  sizeId: string;
};

export type OnCreateKafka = (
  data: CreateKafkaFormData,
  onSuccess: () => void,
  onError: (error: CreateKafkaInstanceError) => void
) => void;

export type MakeCreateKafkaInstanceMachine = {
  getAvailableProvidersAndDefaults: () => Promise<CreateKafkaInitializationData>;
  getStandardSizes: (
    provider: Provider,
    region: Region
  ) => Promise<StandardSizes>;
  getTrialSizes: (provider: Provider, region: Region) => Promise<TrialSizes>;
  onCreate: OnCreateKafka;
};
