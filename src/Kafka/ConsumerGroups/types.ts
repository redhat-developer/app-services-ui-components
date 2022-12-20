export interface Consumer {
  groupId: string;
  topic: string;
  partition: number;
  offset: number;
  logEndOffset?: number;
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

export type ConsumerGroup = {
  consumerGroupId: string;
  activeMembers: number;
  partitionsWithLag: number;
  state: ConsumerGroupState;
  consumers: Consumer[];
};

export type ConsumerGroupField = Exclude<keyof ConsumerGroup, "consumers">;

export type OffsetValue = "absolute" | "latest" | "earliest";
