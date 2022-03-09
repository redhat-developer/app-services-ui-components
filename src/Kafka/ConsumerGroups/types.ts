export interface Consumer {
  /**
   * Unique identifier for the consumer group to which this consumer belongs.
   * @type {string}
   * @memberof Consumer
   */
  groupId: string;
  /**
   * The unique topic name to which this consumer belongs
   * @type {string}
   * @memberof Consumer
   */
  topic: string;
  /**
   * The partition number to which this consumer group is assigned to.
   * @type {number}
   * @memberof Consumer
   */
  partition: number;
  /**
   * Offset denotes the position of the consumer in a partition.
   * @type {number}
   * @memberof Consumer
   */
  offset: number;
  /**
   * The log end offset is the offset of the last message written to a log.
   * @type {number}
   * @memberof Consumer
   */
  logEndOffset?: number;
  /**
   * Offset Lag is the delta between the last produced message and the last consumer\'s committed offset.
   * @type {number}
   * @memberof Consumer
   */
  lag: number;
  /**
   * The member ID is a unique identifier given to a consumer by the coordinator upon initially joining the group.
   * @type {string}
   * @memberof Consumer
   */
  memberId?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum ConsumerGroupStateEnum {
  Stable = "STABLE",
  Dead = "DEAD",
  Empty = "EMPTY",
  CompletingRebalance = "COMPLETING_REBALANCE",
  PreparingRebalance = "PREPARING_REBALANCE",
  Unknown = "UNKNOWN",
}
