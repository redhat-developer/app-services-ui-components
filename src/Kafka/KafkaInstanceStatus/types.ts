export type KafkaStatus =
  | "ready"
  | "degraded"
  | "accepted"
  | "provisioning"
  | "preparing"
  | "deprovision"
  | "deleting"
  | "suspended";

export type PopoverStatus =
  | "pending"
  | "provisioning"
  | "preparing"
  | "ready"
  | "suspended";

export const PopoverStatusOrder: PopoverStatus[] = [
  "pending",
  "preparing",
  "provisioning",
];

export const KafkaToPopoverMapping: {
  [status in KafkaStatus]: PopoverStatus | null;
} = {
  ready: null,
  degraded: null,
  accepted: "pending",
  provisioning: "provisioning",
  preparing: "preparing",
  deprovision: null,
  deleting: null,
  suspended: "suspended",
};
