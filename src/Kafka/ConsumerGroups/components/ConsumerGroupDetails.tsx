import { FunctionComponent } from "react";
import { ConsumerGroupStateEnum, Consumer } from "../types";
import { ConsumerGroupByTopic } from "./ConsumerGroupByTopic";
import { ConsumerGroupByKafka } from "./ConsumerGroupByKafka";

export type ConsumerGroupDetailsProps = {
  consumerGroupByTopic: boolean;
  state: ConsumerGroupStateEnum;
  consumers: Consumer[];
};

export const ConsumerGroupDetails: FunctionComponent<
  ConsumerGroupDetailsProps
> = ({ consumerGroupByTopic, state, consumers }) => {
  return (
    <div>
      {consumerGroupByTopic ? (
        <ConsumerGroupByTopic state={state} consumers={consumers} />
      ) : (
        <ConsumerGroupByKafka state={state} consumers={consumers} />
      )}
    </div>
  );
};
