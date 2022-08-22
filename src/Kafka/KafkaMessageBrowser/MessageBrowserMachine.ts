import { assign, createMachine } from "xstate";
import { DateIsoString } from "../types";
import type { Message } from "./types";
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
    timestamp: DateIsoString | undefined;
    limit: number | undefined;
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
        timestamp: DateIsoString | undefined;
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
        | { type: "setTimestamp"; value: DateIsoString | undefined }
        | { type: "setEpoch"; value: DateIsoString | undefined }
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
      error: {
        on: {
          refresh: "initialLoading",
        },
      },
      ready: {
        initial: "pristine",
        states: {
          pristine: {},
          dirty: {
            tags: "dirty",
          },
          shouldSearch: {
            always: [
              {
                cond: "areFiltersChanged",
                target: "dirty",
              },
              { target: "pristine" },
            ],
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
            target: ".shouldSearch",
            actions: "setPartition",
          },
          setEpoch: {
            actions: "setEpoch",
            target: ".shouldSearch",
          },
          setTimestamp: {
            target: ".shouldSearch",
            actions: "setTimestamp",
          },
          setOffset: {
            target: ".shouldSearch",
            actions: "setOffset",
          },
          setLatest: {
            target: ".shouldSearch",
            actions: "setLatest",
          },
          setLimit: {
            target: ".shouldSearch",
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
          fetchFail: {
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
              limit: context.limit,
            },
          },
        })
      ),
      setPartition: assign((_, { value }) => ({ partition: value })),
      setEpoch: assign((_, { value }) => ({
        timestamp: value,
      })),
      setTimestamp: assign((_, { value }) => ({
        timestamp: value,
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
        response?.messages.find((m) => isSameMessage(m, selectedMessage)) ===
          undefined,
      areFiltersChanged: (context) =>
        context.response?.filter.limit !== context.limit ||
        context.response?.filter.offset !== context.offset ||
        context.response?.filter.partition !== context.partition ||
        context.response?.filter.timestamp !== context.timestamp,
    },
  }
);
