import type {
  CloudProvider,
  CloudRegion,
  MarketplaceSubscription,
  MarketPlaceSubscriptions,
  Plan,
  Quota,
  Size,
} from "../types";

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
export type RegionInfo = {
  id: CloudRegion;
  displayName: string;
  isDisabled: boolean;
};
export type CloudProviderInfo = {
  id: CloudProvider;
  displayName: string;
  regions: Array<RegionInfo>;
  defaultRegion?: CloudRegion;
};
export type CloudProviders = Array<CloudProviderInfo>;
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
  plan: Plan;
  name: string;
  provider: CloudProvider;
  region: CloudRegion;
  sizeId: string;
  billing: MarketplaceSubscription | "prepaid" | undefined;
};
