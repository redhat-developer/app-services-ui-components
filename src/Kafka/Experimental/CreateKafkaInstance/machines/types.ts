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
export type CreateKafkaInstanceError =
  | "over-quota"
  | "name-taken"
  | "trial-unavailable"
  | "form-invalid"
  | "unknown"
  | "region-unavailable";

export type CreateKafkaInitializationData = {
  defaultProvider: Provider | undefined;
  defaultRegion: Region | undefined;
  defaultAZ: AZ | undefined;
  availableProviders: Providers;
  instanceAvailability: InstanceAvailability;
  allowedStreamingUnits?: number;
  remainingStreamingUnits?: number | undefined;
};
export type CreateKafkaFormData = {
  name: string;
  provider: Provider;
  region: Region;
  az: AZ;
};
export type OnCreateKafka = (
  data: CreateKafkaFormData,
  onSuccess: () => void,
  onError: (error: CreateKafkaInstanceError) => void
) => void;
export type MakeCreateKafkaInstanceMachine = {
  getAvailableProvidersAndDefaults: () => Promise<CreateKafkaInitializationData>;
  onCreate: OnCreateKafka;
};
