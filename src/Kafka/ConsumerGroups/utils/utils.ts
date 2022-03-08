import { Consumer } from "../types";

export enum displayConsumerGroupState {
  STABLE = "Stable",
  DEAD = "Dead",
  EMPTY = "Empty",
  COMPLETING_REBALANCE = "Completing rebalance",
  PREPARING_REBALANCE = "Preparing rebalance",
  UNKNOWN = "Unknown",
}

export const activeMembers = (consumer: Consumer[]) => {
  return consumer.reduce(function (prev, cur) {
    return prev + (cur.partition != -1 ? 1 : 0);
  }, 0);
};

export const partionsWithLag = (consumer: Consumer[]) => {
  return consumer.reduce(function (prev, cur) {
    return prev + (cur.lag > 0 ? 1 : 0);
  }, 0);
};
