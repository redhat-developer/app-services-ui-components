import { assign, createMachine } from "xstate";
import { Message } from "./types";
import { isSameMessage } from "./utils";

export type MessageApiResponse = {
  lastUpdated: Date;
  messages: Message[];
  partitions: number;
  offsetMin: number;
  offsetMax: number;

  filter: {
    partition: number | undefined;
    offset: number | undefined;
    timestamp: number | undefined;
  };
};

export const MessageBrowserMachine = createMachine(
  {
    id: "message-browser",
    tsTypes: {} as import("./MessageBrowserMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        // response
        response: MessageApiResponse | undefined;

        limit: number;
        // optional input
        partition: number | undefined;
        offset: number | undefined;
        timestamp: number | undefined;
        selectedMessage: Message | undefined;
      },
      events: {} as
        | {
            type: "fetchSuccess";
            messages: Message[];
            partitions: number;
            offsetMin: number;
            offsetMax: number;
          }
        | { type: "fetchFail" }
        | { type: "refresh" }
        | { type: "setPartition"; value: number | undefined }
        | { type: "setOffset"; value: number | undefined }
        | { type: "setTimestamp"; value: Date | undefined }
        | { type: "setEpoch"; value: number | undefined }
        | { type: "setLatest" }
        | { type: "setLimit"; value: number }
        | { type: "selectMessage"; message: Message }
        | { type: "deselectMessage" },
    },
    initial: "initialLoading",
    context: {
      // response
      response: undefined,

      limit: 10,
      // optional input
      partition: undefined,
      offset: undefined,
      timestamp: undefined,
      selectedMessage: undefined,
    },
    states: {
      initialLoading: {
        invoke: {
          src: "api",
        },
        on: {
          fetchSuccess: {
            actions: "setMessages",
            target: "verifyMessages",
          },
          fetchFail: "error",
        },
      },
      verifyMessages: {
        always: [{ cond: "noMessages", target: "noData" }, { target: "ready" }],
      },
      noData: {
        on: {
          refresh: "initialLoading",
        },
      },
      error: {},
      ready: {
        initial: "pristine",
        states: {
          pristine: {},
          dirty: {
            tags: "dirty",
          },
        },
        always: [
          {
            cond: "selectedMessageNotAvailable",
            actions: "deselectMessage",
          },
        ],
        on: {
          refresh: "refreshing",
          setPartition: {
            target: ".dirty",
            actions: "setPartition",
          },
          setEpoch: {
            actions: "setEpoch",
            target: ".dirty",
          },
          setTimestamp: {
            target: ".dirty",
            actions: "setTimestamp",
          },
          setOffset: {
            target: ".dirty",
            actions: "setOffset",
          },
          setLatest: {
            target: ".dirty",
            actions: "setLatest",
          },
          setLimit: {
            target: ".dirty",
            actions: "setLimit",
          },
          selectMessage: {
            actions: "selectMessage",
          },
          deselectMessage: {
            actions: "deselectMessage",
          },
        },
      },
      refreshing: {
        invoke: {
          src: "api",
        },
        on: {
          fetchSuccess: {
            actions: "setMessages",
            target: "ready",
          },
        },
      },
    },
  },
  {
    actions: {
      setMessages: assign(
        (context, { messages, partitions, offsetMin, offsetMax }) => ({
          response: {
            lastUpdated: new Date(),
            messages,
            partitions,
            offsetMin,
            offsetMax,
            filter: {
              partition: context.partition,
              timestamp: context.timestamp,
              offset: context.offset,
            },
          },
        })
      ),
      setPartition: assign((_, { value }) => ({ partition: value })),
      setEpoch: assign((_, { value }) => ({
        timestamp: value,
      })),
      setTimestamp: assign((_, { value }) => ({
        timestamp: value ? Math.floor(value.getTime() / 1000) : undefined,
      })),
      setOffset: assign((_, { value }) => ({
        offset: value,
      })),
      setLimit: assign((_, { value }) => ({
        limit: value,
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setLatest: assign((_) => ({
        timestamp: undefined,
        offset: undefined,
      })),
      selectMessage: assign((_, { message }) => ({ selectedMessage: message })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      deselectMessage: assign((_) => ({ selectedMessage: undefined })),
    },
    guards: {
      noMessages: ({ response }) =>
        response === undefined || response.messages.length === 0,
      selectedMessageNotAvailable: ({ response, selectedMessage }) =>
        selectedMessage !== undefined &&
        response !== undefined &&
        response.messages.find((m) => isSameMessage(m, selectedMessage)) ===
          undefined,
    },
  }
);
