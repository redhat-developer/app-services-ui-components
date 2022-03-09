import { Consumer } from "../types";

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
