/**
 * A date in the ISO format YYYY-MM-DDTHH:mm:ss.sssZ
 */
export type DateIsoString = string;

/**
 * Supported Cloud Providers. Extend this to add a new provider, then follow
 * Typescript errors to find where extra information need to be added (images,
 * translations).
 */
export type CloudProvider = "aws" | "gcp" | "azure";

/**
 * A Cloud Region. Since this varies between Cloud Providers and has no extra
 * visual attached, we take its name from the API and do no further
 * transformation.
 */
export type CloudRegion = string;
/**
 * Cloud provider multi availability zone
 */
export type AZ = "single" | "multi";
/**
 * A number that describes how much does an instance cost to create
 */
export type Quota = number;
/**
 * The capabilities of an instance, and its quota cost. Some sizes might not be
 * enabled, eg. because temporarily out of capacity
 */
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
/**
 * Paid for instances are `standard`, evaluation instances are `developer`.
 * `standard` instances have a `Quota` associated, and bigger sizes.
 * `developer` instances are free to be created (up to 1 per user), have a
 * single, smaller size option than `standard` ones, and they expire after a
 * few hours.
 *
 * Note: a new kind of evaluation instance is being studied. They will have a
 * long expiration period and bigger sizes.
 */
export type Plan = "standard" | "developer";
/**
 * All the statuses an instance can be. If new statuses are added, ensure to
 * add them to the relevant status group (`ReadyStatuses` etc.).
 */
export const Statuses = [
  "ready",
  "degraded",
  "accepted",
  "provisioning",
  "preparing",
  "deprovision",
  "deleting",
] as const;
export type Status = typeof Statuses[number];
export const ReadyStatuses: Status[] = ["ready"];
export const CreatingStatuses: Status[] = [
  "accepted",
  "provisioning",
  "preparing",
];
export const DegradedStatuses: Status[] = ["degraded"];
export const DeletingStatuses: Status[] = ["deleting", "deprovision"];

/**
 * A list of marketplaces where an instance can be billed to
 */
export type MarketPlace = CloudProvider | "rhm";
/**
 * List of marketplaces where a user has some subscription
 */
export type MarketPlaceSubscriptions = {
  marketplace: MarketPlace;
  subscriptions: string[];
};
/**
 * A specific marketplace's subscription, assigned as billing option to an
 * instance.
 *
 * Note: the API will provide only the `subscription`; the `MarketPlace` will
 * have to be fetched querying for the `subscription`.
 */
export type MarketplaceSubscription = {
  marketplace: MarketPlace;
  subscription: string;
};

/**
 * All the details abut a Kafka instance.
 *
 * Unless differently specified, the values marked as accepting `undefined`
 * will come from extra API calls.
 */
export type KafkaInstance = {
  id: string;
  name: string;
  createdAt: DateIsoString;
  updatedAt: DateIsoString;
  expiryDate: DateIsoString | undefined;
  owner: string;
  provider: CloudProvider;
  region: CloudRegion;
  status: Status;
  plan: Plan;
  size: string | undefined;
  ingress: number | undefined;
  egress: number | undefined;
  storage: number | undefined;
  maxPartitions: number | undefined;
  connections: number | undefined;
  connectionRate: number | undefined;
  messageSize: number | undefined;
  billing: "prepaid" | MarketplaceSubscription | undefined;
};
export type KafkaInstanceField = keyof KafkaInstance;
