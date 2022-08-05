// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.standardPlanService": {
      type: "done.invoke.standardPlanService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.trialPlanService": {
      type: "done.invoke.trialPlanService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.createKafkaInstance.loading.fetching providers:invocation[0]": {
      type: "error.platform.createKafkaInstance.loading.fetching providers:invocation[0]";
      data: unknown;
    };
    "error.platform.createKafkaInstance.loading.quota.checking developer availability:invocation[0]": {
      type: "error.platform.createKafkaInstance.loading.quota.checking developer availability:invocation[0]";
      data: unknown;
    };
    "error.platform.createKafkaInstance.loading.quota.checking standard quota:invocation[0]": {
      type: "error.platform.createKafkaInstance.loading.quota.checking standard quota:invocation[0]";
      data: unknown;
    };
    "error.platform.standardPlanService": {
      type: "error.platform.standardPlanService";
      data: unknown;
    };
    "error.platform.trialPlanService": {
      type: "error.platform.trialPlanService";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    checkDeveloperAvailability: "done.invoke.createKafkaInstance.loading.quota.checking developer availability:invocation[0]";
    checkStandardQuota: "done.invoke.createKafkaInstance.loading.quota.checking standard quota:invocation[0]";
    createInstance:
      | "done.invoke.createKafkaInstance.standard plan.saving:invocation[0]"
      | "done.invoke.createKafkaInstance.developer plan.saving:invocation[0]";
    fetchProvidersWithRegions: "done.invoke.createKafkaInstance.loading.fetching providers:invocation[0]";
    standardPlan: "done.invoke.standardPlanService";
    trialPlan: "done.invoke.trialPlanService";
  };
  missingImplementations: {
    actions: never;
    services:
      | "checkStandardQuota"
      | "checkDeveloperAvailability"
      | "fetchProvidersWithRegions"
      | "standardPlan"
      | "createInstance"
      | "trialPlan";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    notifyCreateErrorToStandardPlan: "createError";
    notifyCreateErrorToTrialPlan: "createError";
    setCapabilities:
      | "error.platform.createKafkaInstance.loading.fetching providers:invocation[0]"
      | "providers and regions available"
      | "providers or regions unavailable";
    setDeveloperAvailable: "developer available";
    setDeveloperUnavailable:
      | "developer unavailable"
      | "error.platform.createKafkaInstance.loading.quota.checking developer availability:invocation[0]";
    setDeveloperUsed: "developer used";
    setProviders: "providers and regions available";
    setProvidersOrRegionsUnavailable:
      | "error.platform.createKafkaInstance.loading.fetching providers:invocation[0]"
      | "providers or regions unavailable";
    setStandardAvailable: "standard quota available";
    setStandardOutOfQuota: "out of standard quota";
    setStandardUnavailable: "error.platform.createKafkaInstance.loading.quota.checking standard quota:invocation[0]";
  };
  eventsCausingServices: {
    checkDeveloperAvailability: "no standard quota available";
    checkStandardQuota: "xstate.init";
    createInstance: "save";
    fetchProvidersWithRegions: "";
    standardPlan: "done.state.createKafkaInstance.loading";
    trialPlan: "done.state.createKafkaInstance.loading";
  };
  eventsCausingGuards: {
    "developer plan": "done.state.createKafkaInstance.loading";
    "standard plan": "done.state.createKafkaInstance.loading";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "complete"
    | "developer plan"
    | "developer plan.idle"
    | "developer plan.saving"
    | "loading"
    | "loading.fetching providers"
    | "loading.quota"
    | "loading.quota.checking developer availability"
    | "loading.quota.checking standard quota"
    | "loading.quota.developer"
    | "loading.quota.standard"
    | "loading.ready"
    | "standard plan"
    | "standard plan.idle"
    | "standard plan.saving"
    | "system unavailable"
    | {
        "developer plan"?: "idle" | "saving";
        loading?:
          | "fetching providers"
          | "quota"
          | "ready"
          | {
              quota?:
                | "checking developer availability"
                | "checking standard quota"
                | "developer"
                | "standard";
            };
        "standard plan"?: "idle" | "saving";
      };
  tags:
    | "loading"
    | "saving"
    | "standardPlan"
    | "systemUnavailable"
    | "trialPlan";
}
