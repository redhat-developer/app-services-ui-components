export type InstanceAvailability =
  | "standard-available"
  | "trial-available"
  | "over-quota"
  | "trial-used"
  | "instance-unavailable"
  | "regions-unavailable"
  | "trial-unavailable";

export type Plan = "trial" | "standard";
export type Provider = string;
export type Region = string;
export type RegionInfo = {
  id: Region;
  displayName: string;
  isDisabled?: boolean;
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
};

export type CreateKafkaInstanceError =
  | "over-quota"
  | "name-taken"
  | "trial-unavailable"
  | "form-invalid"
  | "region-unavailable"
  | "unknown";

export type CreateKafkaInitializationData = {
  defaultProvider: Provider | undefined;
  availableProviders: Providers;
  instanceAvailability: InstanceAvailability;
  maxStreamingUnits: number;
  remainingQuota: number;
  plan: Plan;
};

export type GetSizesData = {
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
  getSizes: (provider: Provider, region: Region) => Promise<GetSizesData>;
  onCreate: OnCreateKafka;
};
