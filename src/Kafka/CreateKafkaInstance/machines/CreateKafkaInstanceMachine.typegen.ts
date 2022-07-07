// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setAvailableProvidersAndDefault: "done.invoke.createKafkaInstance.loading:invocation[0]";
    notifyCreateErrorToStandardPlan: "createError";
    notifyCreateErrorToTrialPlan: "createError";
    initStandarPlan: "done.invoke.createKafkaInstance.loading:invocation[0]";
  };
  internalEvents: {
    "done.invoke.createKafkaInstance.loading:invocation[0]": {
      type: "done.invoke.createKafkaInstance.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
    "done.invoke.standardPlan": {
      type: "done.invoke.standardPlan";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.standardPlan": {
      type: "error.platform.standardPlan";
      data: unknown;
    };
    "done.invoke.trialPlan": {
      type: "done.invoke.trialPlan";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.trialPlan": {
      type: "error.platform.trialPlan";
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    getAvailableProvidersAndDefaults: "done.invoke.createKafkaInstance.loading:invocation[0]";
    standardPlan: "done.invoke.standardPlan";
    createInstance:
      | "done.invoke.createKafkaInstance.standardPlan.saving:invocation[0]"
      | "done.invoke.createKafkaInstance.trialPlan.saving:invocation[0]";
    trialPlan: "done.invoke.trialPlan";
  };
  missingImplementations: {
    actions: never;
    services:
      | "getAvailableProvidersAndDefaults"
      | "standardPlan"
      | "trialPlan"
      | "createInstance";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getAvailableProvidersAndDefaults: "xstate.init";
    standardPlan: "done.invoke.createKafkaInstance.loading:invocation[0]";
    trialPlan: "done.invoke.createKafkaInstance.loading:invocation[0]";
    createInstance: "save";
  };
  eventsCausingGuards: {
    canCreateStandardInstances: "done.invoke.createKafkaInstance.loading:invocation[0]";
    canCreateTrialInstances: "done.invoke.createKafkaInstance.loading:invocation[0]";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "loading"
    | "systemUnavailable"
    | "standardPlan"
    | "standardPlan.init"
    | "standardPlan.idle"
    | "standardPlan.saving"
    | "trialPlan"
    | "trialPlan.idle"
    | "trialPlan.saving"
    | "complete"
    | {
        standardPlan?: "init" | "idle" | "saving";
        trialPlan?: "idle" | "saving";
      };
  tags: "systemUnavailable" | "saving";
}
