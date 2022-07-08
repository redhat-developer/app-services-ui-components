// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setConsumers: "fetchSuccess";
  };
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    api: "done.invoke.consumer-group.initialLodaing:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "api";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    api: "refresh";
  };
  eventsCausingGuards: {
    noConsumers: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "initialLodaing"
    | "verifyConsumers"
    | "noData"
    | "error"
    | "ready";
  tags: never;
}
