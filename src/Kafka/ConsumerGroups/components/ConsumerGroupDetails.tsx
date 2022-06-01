import type { FunctionComponent } from "react";
import type { Consumer, ConsumerGroupState } from "../types";
import { ConsumerGroupByTopic } from "./ConsumerGroupByTopic";
import { ConsumerGroupByKafka } from "./ConsumerGroupByKafka";

export type ConsumerGroupDetailsProps = {
  consumerGroupByTopic: boolean;
  state: ConsumerGroupState;
  activeMembers: number;
  partitionsWithLag: number;
  consumers: Consumer[];
};

export const ConsumerGroupDetails: FunctionComponent<
  ConsumerGroupDetailsProps
> = ({
  consumerGroupByTopic,
  state,
  consumers,
  activeMembers,
  partitionsWithLag,
}) => {
  return (
    <div>
      {consumerGroupByTopic ? (
        <ConsumerGroupByTopic
          state={state}
          consumers={consumers}
          activeMembers={activeMembers}
          partitionsWithLag={partitionsWithLag}
        />
      ) : (
        <ConsumerGroupByKafka
          state={state}
          consumers={consumers}
          activeMembers={activeMembers}
          partitionsWithLag={partitionsWithLag}
        />
      )}
    </div>
  );
};
