import { createMachine, assign } from "xstate";
import { ConsumerGroup } from "./types";

export type ConsumerGroupApiResponse = {
  consumers: ConsumerGroup[];
};

export const ConsumerGroupMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2A7WBXAtmATgLRT6pYAOAdAJbrUAu1AhgDYAyqETtUAxAGZh6yABYBlLMmRx4SEOVSwG1DIlAAPRAEYAzACZKWgOwBOABwA2PQFZrFowBYtenQBoQAT0SFrDyjqMABjMzay1rQJcnHQBfGPc0TFwCYlIKGjpGVg4uHgEhUQAxbhY1eUVlVTlNBCctSgiTBzMTRz12ky13LwRCHQcdfyMg6xN7CzDOuISMbDwiEjIqADcCan4PAGFZ5PxYXjKFJUYqjW8dAMozQJ1dCwn+s2Hu7z0HC39rEMC7LUCtCw6MbTECJOYpRbpdCoAAiTHoTF4+DA-GRsBEhwqJ3QZRqOi+lAsTiMehMekC7yabk8iCM9WCFK05hJwzJFhBYN2qSWlAIpHwSJRaIxciOlRx1UQ+I+9kiDki1nJ1iMypeCC0AMJITCFianRMirMcXiIGhEDgZU58256VoymynG46CgmOOKglZ16Rg+QX0QMsCsCYzVfRVnysHXeUZMHJ21shKzWG22SXmslAYuxuNe4UoRhaZiBARGDm9auM9QGrQcAx0gKM+NjqYhaSo0LhCNd4uz6vslFJemGo2VVnl1J6hA+AWCoXCkX6uib4IWrd5+H5Xazkt7Rn7ZKHBu9bxuatLlB+g50IRC7z0AKXXITlGRTAgPQzWPdPb6ZkroX6TS1gaEzlg41iUCY+JjESdLzjYD7xq2m5ftuhDyuBzTWABNYXMB1ghjWZj+IOoyFoEFL5jcxoxEAA */
  createMachine(
    {
      context: { response: undefined, consumer: undefined },
      tsTypes: {} as import("./ConsumerGroupMachine.typegen").Typegen0,
      schema: {
        context: {} as {
          response: ConsumerGroupApiResponse | undefined;
          consumer: ConsumerGroup | undefined;
        },
        events: {} as
          | {
              type: "fetchSuccess";
              consumers: ConsumerGroup[];
            }
          | { type: "fetchFail" }
          | { type: "refresh" }
          | { type: "selectConsumer"; consumer: ConsumerGroup }
          | { type: "deselectConsumer" },
      },
      id: "consumer-group",
      initial: "initialLodaing",
      states: {
        initialLodaing: {
          invoke: {
            src: "api",
          },
          on: {
            fetchSuccess: {
              actions: "setConsumers",
              target: "verifyConsumers",
            },
            fetchFail: {
              target: "error",
            },
          },
        },
        verifyConsumers: {
          always: [
            {
              cond: "noConsumers",
              target: "noData",
            },
            {
              target: "ready",
            },
          ],
        },
        noData: {
          on: {
            refresh: {
              target: "initialLodaing",
            },
          },
        },
        error: {
          on: {
            refresh: {
              target: "initialLodaing",
            },
          },
        },
        ready: {},
      },
    },
    {
      actions: {
        setConsumers: assign((_, { consumers }) => ({
          response: {
            consumers,
          },
        })),
      },
      guards: {
        noConsumers: ({ response }) =>
          response === undefined || response.consumers.length === 0,
      },
    }
  );
