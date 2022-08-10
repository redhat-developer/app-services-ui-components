import type { Status } from "../../../types";

export type PopoverStatus = "pending" | "provisioning" | "preparing" | "ready";
export const PopoverStatusOrder: PopoverStatus[] = [
  "pending",
  "provisioning",
  "preparing",
];
export const KafkaToPopoverMapping: {
  [status in Status]: PopoverStatus | null;
} = {
  ready: null,
  degraded: null,
  accepted: "pending",
  provisioning: "provisioning",
  preparing: "preparing",
  deprovision: null,
  deleting: null,
};
