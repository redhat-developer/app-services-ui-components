export interface Consumer {
  groupId: string;
  topic: string;
  partition: number;
  offset: number;
  logEndOffset: number;
  lag: number;
  memberId?: string;
}

export type ConsumerGroupState =
  | "Stable"
  | "Dead"
  | "Empty"
  | "CompletingRebalance"
  | "PreparingRebalance"
  | "Unknown";

export interface ConsumerGroup {
  consumerGroupId: string;
  activeMembers: number;
  partitionsWithLag: number;
  state: ConsumerGroupState;
}
