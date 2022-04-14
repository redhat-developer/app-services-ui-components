// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setMessages: "fetchSuccess";
    setPartition: "setPartition";
    setEpoch: "setEpoch";
    setTimestamp: "setTimestamp";
    setOffset: "setOffset";
    setLatest: "setLatest";
  };
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    api:
      | "done.invoke.message-browser.initialLoading:invocation[0]"
      | "done.invoke.message-browser.refreshing:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "api";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    api:
      | "refresh"
      | "setPartition"
      | "setEpoch"
      | "setTimestamp"
      | "setOffset"
      | "setLatest";
  };
  eventsCausingGuards: {
    noMessages: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "initialLoading"
    | "verifyMessages"
    | "noData"
    | "error"
    | "ready"
    | "refreshing";
  tags: never;
}
