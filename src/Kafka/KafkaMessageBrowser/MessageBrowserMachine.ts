import { assign, createMachine } from "xstate";
import { Message } from "./types";

export const MessageBrowserMachine = createMachine(
  {
    id: "message-browser",
    tsTypes: {} as import("./MessageBrowserMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        lastUpdated: Date | undefined;
        messages: Message[] | undefined;
        partition: number;
        partitions: number | undefined;
        offset: number;
        timestamp: number | undefined;
      },
      events: {} as
        | { type: "fetchSuccess"; messages: Message[]; partitions: number }
        | { type: "fetchFail" }
        | { type: "refresh" }
        | { type: "setPartition"; value: number | undefined }
        | { type: "setOffset"; value: number | undefined }
        | { type: "setTimestamp"; value: Date | undefined }
        | { type: "setEpoch"; value: number | undefined }
        | { type: "setLatest" },
    },
    initial: "initialLoading",
    context: {
      lastUpdated: undefined,
      messages: undefined,
      partition: 0,
      partitions: undefined,
      offset: 9,
      timestamp: undefined,
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
      noData: {},
      error: {},
      ready: {
        on: {
          refresh: "refreshing",
          setPartition: {
            actions: "setPartition",
            target: "refreshing",
          },
          setEpoch: {
            actions: "setEpoch",
            target: "refreshing",
          },
          setTimestamp: {
            actions: "setTimestamp",
            target: "refreshing",
          },
          setOffset: {
            actions: "setOffset",
            target: "refreshing",
          },
          setLatest: {
            actions: "setLatest",
            target: "refreshing",
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
      setMessages: assign((_, { messages, partitions }) => ({
        messages,
        partitions,
      })),
      setPartition: assign((_, { value }) => ({ partition: value })),
      setEpoch: assign((_, { value }) => ({
        timestamp: value,
      })),
      setTimestamp: assign((_, { value }) => ({
        timestamp: value ? value.getTime() : undefined,
      })),
      setOffset: assign((_, { value }) => ({
        offset: value,
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setLatest: assign((_) => ({
        timestamp: undefined,
      })),
    },
    guards: {
      noMessages: ({ messages }) =>
        messages === undefined || messages.length === 0,
    },
  }
);
