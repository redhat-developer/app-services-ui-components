import { FormEvent } from "react";

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
  | "unknown";

export type CreateKafkaInitializationData = {
  defaultProvider: Provider | undefined;
  defaultAZ: AZ | undefined;
  availableProviders: Providers;
  instanceAvailability: InstanceAvailability;
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

export type validate = "error" | "default";

export type FormProps = {
  FORM_ID: string;
  isNameTaken: boolean;
  isNameInvalid: boolean;
  nameValidation: validate;
  name: string | undefined;
  disableControls: boolean;
  providerValidation: validate;
  availableProviders: Providers;
  provider: Provider | undefined;
  regionValidation: validate;
  regions: RegionInfo[] | undefined;
  region: Region | undefined;
  azValidation: validate;
  azOptions: { [az in AZ]: boolean } | undefined;
  az: AZ | undefined;
  disableAZTooltip: boolean;
  isDisabledSize: boolean;
  size: number | undefined;
  setSize: (size: number) => void;
  setRegion: (region: Region) => void;
  setName: (name: string) => void;
  setProvider: (provider: Provider) => void;
  setAZ: (az: AZ) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
