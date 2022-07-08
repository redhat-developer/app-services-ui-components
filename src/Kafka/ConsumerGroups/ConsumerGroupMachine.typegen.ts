// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setConsumers: "fetchSuccess";
    setSelectedConsumerGroup: "delete";
  };
  internalEvents: {
    "xstate.after(5000)#consumer-group.ready.viewing results.idle": {
      type: "xstate.after(5000)#consumer-group.ready.viewing results.idle";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    api:
      | "done.invoke.consumer-group.initialLodaing:invocation[0]"
      | "done.invoke.consumer-group.ready.viewing results.refreshing:invocation[0]";
    deleteConsumerGroup: "done.invoke.consumer-group.ready.deleting consumer group.deleting:invocation[0]";
  };
  missingImplementations: {
    actions: "setSelectedConsumerGroup";
    services: "api" | "deleteConsumerGroup";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    api:
      | "refresh"
      | "xstate.after(5000)#consumer-group.ready.viewing results.idle"
      | "deleteSuccess";
    deleteConsumerGroup: "confirm";
  };
  eventsCausingGuards: {
    noConsumers: "fetchSuccess";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "initialLodaing"
    | "noData"
    | "error"
    | "ready"
    | "ready.viewing results"
    | "ready.viewing results.idle"
    | "ready.viewing results.refreshing"
    | "ready.deleting consumer group"
    | "ready.deleting consumer group.idle"
    | "ready.deleting consumer group.deleting"
    | "ready.view partion offset"
    | "ready.reset offset"
    | {
        ready?:
          | "viewing results"
          | "deleting consumer group"
          | "view partion offset"
          | "reset offset"
          | {
              "viewing results"?: "idle" | "refreshing";
              "deleting consumer group"?: "idle" | "deleting";
            };
      };
  tags: never;
}
