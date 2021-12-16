export type CloudProvider = {
  display_name?: string;
  name?: string;
};

export type CloudRegion = {
  id: string;
  display_name: string;
};

export type Validated<T> = {
  value: T;
  validated?: "success" | "warning" | "error" | "default";
  errorMessage?: string;
};

export type CloudProvidersTileProps = {
  cloudProviders?: CloudProvider[];
  kafkaRequest: NewKafkaRequestPayload;
  selectCloudProvider: (cloudProvider: CloudProvider) => void;
};

export type NewKafkaRequestPayload = {
  cloud_provider: Validated<string | undefined>;
  multi_az: Validated<boolean | undefined>;
  region: Validated<string | undefined>;
  name: Validated<string | undefined>;
};

export const isKafkaRequestInvalid = (
  value: NewKafkaRequestPayload
): boolean => {
  return (
    value.name.validated === "error" ||
    value.region.validated === "error" ||
    value.cloud_provider.validated === "error" ||
    value.multi_az.validated === "error"
  );
};
