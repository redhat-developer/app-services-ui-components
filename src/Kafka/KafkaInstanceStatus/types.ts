export type KafkaStatus =
  | "ready"
  | "degraded"
  | "accepted"
  | "provisioning"
  | "preparing"
  | "deprovision"
  | "deleting"
  | "suspended"
  | "suspending"
  | "resuming";

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
  suspending: null,
  resuming: null,
};
