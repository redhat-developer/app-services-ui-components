// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.after(1000)#kafkaInstanceMetrics.callApi.failure": {
      type: "xstate.after(1000)#kafkaInstanceMetrics.callApi.failure";
    };
    "xstate.after(1000)#kafkaInstanceMetrics.initialLoading.failure": {
      type: "xstate.after(1000)#kafkaInstanceMetrics.initialLoading.failure";
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
  eventsCausingActions: {
    incrementRetries: "fetchFail";
    resetRetries: "refresh";
    setBroker: "selectBroker";
    setDuration: "selectDuration";
    setFetchTimestamp:
      | "refresh"
      | "selectBroker"
      | "selectDuration"
      | "xstate.init";
    setMetrics: "fetchSuccess";
  };
  eventsCausingServices: {
    api:
      | "refresh"
      | "selectBroker"
      | "selectDuration"
      | "xstate.after(1000)#kafkaInstanceMetrics.callApi.failure"
      | "xstate.after(1000)#kafkaInstanceMetrics.initialLoading.failure"
      | "xstate.init";
  };
  eventsCausingGuards: {
    canRetryFetching:
      | "xstate.after(1000)#kafkaInstanceMetrics.callApi.failure"
      | "xstate.after(1000)#kafkaInstanceMetrics.initialLoading.failure";
    isJustCreated: "fetchSuccess";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "callApi"
    | "callApi.failure"
    | "callApi.loading"
    | "criticalFail"
    | "initialLoading"
    | "initialLoading.failure"
    | "initialLoading.loading"
    | "justCreated"
    | "refreshing"
    | "withResponse"
    | {
        callApi?: "failure" | "loading";
        initialLoading?: "failure" | "loading";
      };
  tags:
    | "failed"
    | "initialLoading"
    | "justCreated"
    | "loading"
    | "refreshing"
    | "withResponse";
}
