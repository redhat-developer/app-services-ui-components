// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.after(1000)#kpis.callApi.failure": {
      type: "xstate.after(1000)#kpis.callApi.failure";
    };
    "xstate.after(1000)#kpis.initialLoading.failure": {
      type: "xstate.after(1000)#kpis.initialLoading.failure";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    api:
      | "done.invoke.kpis.initialLoading.loading:invocation[0]"
      | "done.invoke.kpis.callApi.loading:invocation[0]"
      | "done.invoke.kpis.withResponse.refreshing:invocation[0]";
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
    setMetrics: "fetchSuccess";
  };
  eventsCausingServices: {
    api:
      | "refresh"
      | "xstate.after(1000)#kpis.callApi.failure"
      | "xstate.after(1000)#kpis.initialLoading.failure"
      | "xstate.init";
  };
  eventsCausingGuards: {
    canRetryFetching:
      | "xstate.after(1000)#kpis.callApi.failure"
      | "xstate.after(1000)#kpis.initialLoading.failure";
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
    | "withResponse"
    | "withResponse.idle"
    | "withResponse.refreshing"
    | {
        callApi?: "failure" | "loading";
        initialLoading?: "failure" | "loading";
        withResponse?: "idle" | "refreshing";
      };
  tags:
    | "failed"
    | "initialLoading"
    | "justCreated"
    | "loading"
    | "refreshing"
    | "withResponse";
}
