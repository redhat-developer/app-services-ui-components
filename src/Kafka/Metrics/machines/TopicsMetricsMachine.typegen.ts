// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setMetrics: "fetchSuccess";
    incrementRetries: "fetchFail";
    resetRetries: "refresh";
    setTopic: "selectTopic";
    setDuration: "selectDuration";
    setFetchTimestamp: "refresh" | "selectTopic" | "selectDuration";
  };
  internalEvents: {
    "xstate.after(1000)#topicsMetrics.initialLoading.failure": {
      type: "xstate.after(1000)#topicsMetrics.initialLoading.failure";
    };
    "xstate.after(1000)#topicsMetrics.callApi.failure": {
      type: "xstate.after(1000)#topicsMetrics.callApi.failure";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    api:
      | "done.invoke.topicsMetrics.initialLoading.loading:invocation[0]"
      | "done.invoke.topicsMetrics.callApi.loading:invocation[0]"
      | "done.invoke.topicsMetrics.withResponse.refreshing:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "api";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    api:
      | "xstate.after(1000)#topicsMetrics.initialLoading.failure"
      | "xstate.after(1000)#topicsMetrics.callApi.failure"
      | "refresh";
  };
  eventsCausingGuards: {
    isJustCreated: "fetchSuccess";
    canRetryFetching:
      | "xstate.after(1000)#topicsMetrics.initialLoading.failure"
      | "xstate.after(1000)#topicsMetrics.callApi.failure";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "initialLoading"
    | "initialLoading.loading"
    | "initialLoading.failure"
    | "callApi"
    | "callApi.loading"
    | "callApi.failure"
    | "criticalFail"
    | "justCreated"
    | "withResponse"
    | "withResponse.idle"
    | "withResponse.refreshing"
    | {
        initialLoading?: "loading" | "failure";
        callApi?: "loading" | "failure";
        withResponse?: "idle" | "refreshing";
      };
  tags:
    | "initialLoading"
    | "loading"
    | "failed"
    | "justCreated"
    | "withResponse"
    | "refreshing";
}
