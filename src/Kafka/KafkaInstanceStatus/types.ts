export type KafkaStatus =
  | "ready"
  | "failed"
  | "accepted"
  | "provisioning"
  | "preparing"
  | "deprovision"
  | "deleting";

export type PopoverStatus = "pending" | "provisioning" | "preparing" | "ready";

export const PopoverStatusOrder: PopoverStatus[] = [
  "pending",
  "provisioning",
  "preparing",
];

export const KafkaToPopoverMapping: {
  [status in KafkaStatus]: PopoverStatus | null;
} = {
  ready: null,
  failed: null,
  accepted: "pending",
  provisioning: "provisioning",
  preparing: "preparing",
  deprovision: null,
  deleting: null,
};
