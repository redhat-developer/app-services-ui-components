export type InstanceAvailability =
  | "quota"
  | "trial"
  | "over-quota"
  | "trial-used"
  | "instance-unavailable"
  | "regions-unavailable"
  /** @deprecated replaced by `instance-unavailable` */
  | "trial-unavailable";

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
  AZ: {
    [az in AZ]: boolean;
  };
};
export type Regions = Array<RegionInfo>;
export type Providers = Array<ProviderInfo>;
export type Size = {
  id: string;
  streamingUnits: number;
  ingressEgress: number;
  storage: number;
  connections: number;
  connectionRate: number;
  maxPartitions: number;
  messageSize: number;
};

export type CreateKafkaInstanceError =
  | "over-quota"
  | "name-taken"
  | "trial-unavailable"
  | "form-invalid"
  | "standard-region-unavailable"
  | "trial-region-unavailable"
  | "unknown";

export type CreateKafkaInitializationData = {
  defaultProvider: Provider | undefined;
  defaultRegion: Region | undefined;
  defaultAZ: AZ | undefined;
  availableProviders: Providers;
  instanceAvailability: InstanceAvailability;
  maxStreamingUnits: number;
  remainingStreamingUnits: number;
};

export type GetSizesData = {
  sizes: Size[];
};

export type CreateKafkaFormData = {
  name: string;
  provider: Provider;
  region: Region;
  az: AZ;
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
