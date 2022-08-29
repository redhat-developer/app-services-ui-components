// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setStandardUnavailable: "error.platform.createKafkaInstance.loading.quota.checking standard quota:invocation[0]";
    setStandardAvailable: "standard quota available";
    setStandardOutOfQuota: "out of standard quota";
    setDeveloperUnavailable:
      | "error.platform.createKafkaInstance.loading.quota.checking developer availability:invocation[0]"
      | "developer unavailable";
    setDeveloperUsed: "developer used";
    setDeveloperAvailable: "developer available";
    setProvidersOrRegionsUnavailable:
      | "error.platform.createKafkaInstance.loading.fetching providers:invocation[0]"
      | "providers or regions unavailable";
    setProviders: "providers and regions available";
    notifyCreateErrorToStandardPlan: "createError";
    notifyCreateErrorToTrialPlan: "createError";
    setCapabilities:
      | "error.platform.createKafkaInstance.loading.fetching providers:invocation[0]"
      | "providers and regions available"
      | "providers or regions unavailable";
  };
  internalEvents: {
    "error.platform.createKafkaInstance.loading.quota.checking standard quota:invocation[0]": {
      type: "error.platform.createKafkaInstance.loading.quota.checking standard quota:invocation[0]";
      data: unknown;
    };
    "error.platform.createKafkaInstance.loading.quota.checking developer availability:invocation[0]": {
      type: "error.platform.createKafkaInstance.loading.quota.checking developer availability:invocation[0]";
      data: unknown;
    };
    "error.platform.createKafkaInstance.loading.fetching providers:invocation[0]": {
      type: "error.platform.createKafkaInstance.loading.fetching providers:invocation[0]";
      data: unknown;
    };
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
    "done.invoke.standardPlanService": {
      type: "done.invoke.standardPlanService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.standardPlanService": {
      type: "error.platform.standardPlanService";
      data: unknown;
    };
    "done.invoke.trialPlanService": {
      type: "done.invoke.trialPlanService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.trialPlanService": {
      type: "error.platform.trialPlanService";
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    checkStandardQuota: "done.invoke.createKafkaInstance.loading.quota.checking standard quota:invocation[0]";
    checkDeveloperAvailability: "done.invoke.createKafkaInstance.loading.quota.checking developer availability:invocation[0]";
    fetchProvidersWithRegions: "done.invoke.createKafkaInstance.loading.fetching providers:invocation[0]";
    standardPlan: "done.invoke.standardPlanService";
    createInstance:
      | "done.invoke.createKafkaInstance.standard plan.saving:invocation[0]"
      | "done.invoke.createKafkaInstance.developer plan.saving:invocation[0]";
    trialPlan: "done.invoke.trialPlanService";
  };
  missingImplementations: {
    actions: never;
    services:
      | "standardPlan"
      | "trialPlan"
      | "checkStandardQuota"
      | "checkDeveloperAvailability"
      | "fetchProvidersWithRegions"
      | "createInstance";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    standardPlan: "done.state.createKafkaInstance.loading";
    trialPlan: "done.state.createKafkaInstance.loading";
    checkStandardQuota: "xstate.init";
    checkDeveloperAvailability: "no standard quota available";
    fetchProvidersWithRegions: "";
    createInstance: "save";
  };
  eventsCausingGuards: {
    "standard plan": "done.state.createKafkaInstance.loading";
    "developer plan": "done.state.createKafkaInstance.loading";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "loading"
    | "loading.quota"
    | "loading.quota.checking standard quota"
    | "loading.quota.standard"
    | "loading.quota.developer"
    | "loading.quota.checking developer availability"
    | "loading.fetching providers"
    | "loading.ready"
    | "system unavailable"
    | "standard plan"
    | "standard plan.idle"
    | "standard plan.saving"
    | "developer plan"
    | "developer plan.idle"
    | "developer plan.saving"
    | "complete"
    | {
        loading?:
          | "quota"
          | "fetching providers"
          | "ready"
          | {
              quota?:
                | "checking standard quota"
                | "standard"
                | "developer"
                | "checking developer availability";
            };
        "standard plan"?: "idle" | "saving";
        "developer plan"?: "idle" | "saving";
      };
  tags:
    | "loading"
    | "systemUnavailable"
    | "standardPlan"
    | "saving"
    | "trialPlan";
}
