// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setMetrics: "fetchSuccess";
    incrementRetries: "fetchFail";
    resetRetries: "refresh";
    setDuration: "selectDuration";
    setFetchTimestamp: "refresh" | "selectDuration";
  };
  internalEvents: {
    "xstate.after(1000)#kafkaInstanceMetrics.initialLoading.failure": {
      type: "xstate.after(1000)#kafkaInstanceMetrics.initialLoading.failure";
    };
    "xstate.after(1000)#kafkaInstanceMetrics.callApi.failure": {
      type: "xstate.after(1000)#kafkaInstanceMetrics.callApi.failure";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    api:
      | "done.invoke.kafkaInstanceMetrics.initialLoading.loading:invocation[0]"
      | "done.invoke.kafkaInstanceMetrics.callApi.loading:invocation[0]"
      | "done.invoke.kafkaInstanceMetrics.refreshing:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "api";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    api:
      | "xstate.after(1000)#kafkaInstanceMetrics.initialLoading.failure"
      | "xstate.after(1000)#kafkaInstanceMetrics.callApi.failure"
      | "refresh";
  };
  eventsCausingGuards: {
    isJustCreated: "fetchSuccess";
    canRetryFetching:
      | "xstate.after(1000)#kafkaInstanceMetrics.initialLoading.failure"
      | "xstate.after(1000)#kafkaInstanceMetrics.callApi.failure";
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
    | "refreshing"
    | {
        initialLoading?: "loading" | "failure";
        callApi?: "loading" | "failure";
      };
  tags:
    | "initialLoading"
    | "loading"
    | "failed"
    | "justCreated"
    | "withResponse"
    | "refreshing";
}
