// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setMetrics: "fetchSuccess";
    incrementRetries: "fetchFail";
    resetRetries: "refresh";
  };
  internalEvents: {
    "xstate.after(1000)#kpis.initialLoading.failure": {
      type: "xstate.after(1000)#kpis.initialLoading.failure";
    };
    "xstate.after(1000)#kpis.callApi.failure": {
      type: "xstate.after(1000)#kpis.callApi.failure";
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
  eventsCausingServices: {
    api:
      | "xstate.after(1000)#kpis.initialLoading.failure"
      | "xstate.after(1000)#kpis.callApi.failure"
      | "refresh";
  };
  eventsCausingGuards: {
    isJustCreated: "fetchSuccess";
    canRetryFetching:
      | "xstate.after(1000)#kpis.initialLoading.failure"
      | "xstate.after(1000)#kpis.callApi.failure";
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
