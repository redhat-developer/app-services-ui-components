// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
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
  eventsCausingActions: {
    deselectMessage: "" | "deselectMessage";
    selectMessage: "selectMessage";
    setEpoch: "setEpoch";
    setLatest: "setLatest";
    setLimit: "setLimit";
    setMessages: "fetchSuccess";
    setOffset: "setOffset";
    setPartition: "setPartition";
    setTimestamp: "setTimestamp";
  };
  eventsCausingServices: {
    api: "refresh" | "xstate.init";
  };
  eventsCausingGuards: {
    areFiltersChanged: "";
    noMessages: "";
    selectedMessageNotAvailable: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "error"
    | "initialLoading"
    | "noData"
    | "ready"
    | "ready.dirty"
    | "ready.pristine"
    | "ready.shouldSearch"
    | "refreshing"
    | "verifyMessages"
    | { ready?: "dirty" | "pristine" | "shouldSearch" };
  tags: "dirty";
}
