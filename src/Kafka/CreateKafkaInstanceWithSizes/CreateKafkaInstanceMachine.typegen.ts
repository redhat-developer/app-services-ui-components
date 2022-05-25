// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setAvailableProvidersAndDefault: "done.invoke.createKafkaInstance.loading:invocation[0]";
    initDone: "done.invoke.createKafkaInstance.loading:invocation[0]";
    setName: "nameChange";
    formChange: "nameChange" | "providerChange" | "regionChange" | "sizeChange";
    setProvider: "providerChange";
    setRegion: "regionChange";
    setSize: "sizeChange";
    setSizes:
      | "done.invoke.createKafkaInstance.standardPlan.configuring.size.loading:invocation[0]"
      | "done.invoke.createKafkaInstance.trialPlan.configuring.size.loading:invocation[0]";
    formSubmit: "create";
    resetCreationErrorMessage: "formChange" | "create";
    setCreationError: "createError";
  };
  internalEvents: {
    "done.invoke.createKafkaInstance.loading:invocation[0]": {
      type: "done.invoke.createKafkaInstance.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.createKafkaInstance.standardPlan.configuring.size.loading:invocation[0]": {
      type: "done.invoke.createKafkaInstance.standardPlan.configuring.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.createKafkaInstance.trialPlan.configuring.size.loading:invocation[0]": {
      type: "done.invoke.createKafkaInstance.trialPlan.configuring.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getAvailableProvidersAndDefaults: "done.invoke.createKafkaInstance.loading:invocation[0]";
    getSizes:
      | "done.invoke.createKafkaInstance.standardPlan.configuring.size.loading:invocation[0]"
      | "done.invoke.createKafkaInstance.trialPlan.configuring.size.loading:invocation[0]";
    createInstance:
      | "done.invoke.createKafkaInstance.standardPlan.configuring.form.saving:invocation[0]"
      | "done.invoke.createKafkaInstance.trialPlan.configuring.form.saving:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services:
      | "getAvailableProvidersAndDefaults"
      | "getSizes"
      | "createInstance";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getAvailableProvidersAndDefaults: "xstate.init";
    getSizes: "";
    createInstance: "create";
  };
  eventsCausingGuards: {
    canCreateStandardInstances: "";
    canCreateTrialInstances: "";
    isOverQuota: "";
    isInstanceUnavailable: "";
    isRegionsUnavailable: "";
    nameIsEmpty: "";
    nameIsValid: "";
    didProviderChange: "providerChange";
    providerIsValid: "";
    didRegionChange: "regionChange";
    regionIsValid: "";
    didSizeChange: "sizeChange";
    noProviderAndRegion: "";
    noSizes: "";
    emptySizes: "";
    sizeIsDisabled: "";
    sizeIsOverQuota: "";
    canSave: "create" | "formChange";
    isTrialUsed: "";
    isTrialUnavailable: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "loading"
    | "systemUnavailable"
    | "selectPlan"
    | "standardPlan"
    | "standardPlan.verifyAvailability"
    | "standardPlan.overQuota"
    | "standardPlan.instanceUnavailable"
    | "standardPlan.regionsUnavailable"
    | "standardPlan.configuring"
    | "standardPlan.configuring.name"
    | "standardPlan.configuring.name.untouched"
    | "standardPlan.configuring.name.empty"
    | "standardPlan.configuring.name.invalid"
    | "standardPlan.configuring.name.valid"
    | "standardPlan.configuring.name.validate"
    | "standardPlan.configuring.provider"
    | "standardPlan.configuring.provider.untouched"
    | "standardPlan.configuring.provider.validate"
    | "standardPlan.configuring.provider.invalid"
    | "standardPlan.configuring.provider.valid"
    | "standardPlan.configuring.region"
    | "standardPlan.configuring.region.untouched"
    | "standardPlan.configuring.region.validate"
    | "standardPlan.configuring.region.invalid"
    | "standardPlan.configuring.region.valid"
    | "standardPlan.configuring.size"
    | "standardPlan.configuring.size.validate"
    | "standardPlan.configuring.size.idle"
    | "standardPlan.configuring.size.disabled"
    | "standardPlan.configuring.size.overQuota"
    | "standardPlan.configuring.size.valid"
    | "standardPlan.configuring.size.error"
    | "standardPlan.configuring.size.loading"
    | "standardPlan.configuring.form"
    | "standardPlan.configuring.form.unsubmitted"
    | "standardPlan.configuring.form.invalid"
    | "standardPlan.configuring.form.saving"
    | "trialPlan"
    | "trialPlan.verifyAvailability"
    | "trialPlan.trialUsed"
    | "trialPlan.trialUnavailable"
    | "trialPlan.configuring"
    | "trialPlan.configuring.name"
    | "trialPlan.configuring.name.untouched"
    | "trialPlan.configuring.name.empty"
    | "trialPlan.configuring.name.invalid"
    | "trialPlan.configuring.name.valid"
    | "trialPlan.configuring.name.validate"
    | "trialPlan.configuring.provider"
    | "trialPlan.configuring.provider.untouched"
    | "trialPlan.configuring.provider.validate"
    | "trialPlan.configuring.provider.invalid"
    | "trialPlan.configuring.provider.valid"
    | "trialPlan.configuring.region"
    | "trialPlan.configuring.region.untouched"
    | "trialPlan.configuring.region.validate"
    | "trialPlan.configuring.region.invalid"
    | "trialPlan.configuring.region.valid"
    | "trialPlan.configuring.form"
    | "trialPlan.configuring.form.unsubmitted"
    | "trialPlan.configuring.form.invalid"
    | "trialPlan.configuring.form.saving"
    | "trialPlan.configuring.size"
    | "trialPlan.configuring.size.validate"
    | "trialPlan.configuring.size.idle"
    | "trialPlan.configuring.size.disabled"
    | "trialPlan.configuring.size.overQuota"
    | "trialPlan.configuring.size.valid"
    | "trialPlan.configuring.size.error"
    | "trialPlan.configuring.size.loading"
    | "complete"
    | {
        standardPlan?:
          | "verifyAvailability"
          | "overQuota"
          | "instanceUnavailable"
          | "regionsUnavailable"
          | "configuring"
          | {
              configuring?:
                | "name"
                | "provider"
                | "region"
                | "size"
                | "form"
                | {
                    name?:
                      | "untouched"
                      | "empty"
                      | "invalid"
                      | "valid"
                      | "validate";
                    provider?: "untouched" | "validate" | "invalid" | "valid";
                    region?: "untouched" | "validate" | "invalid" | "valid";
                    size?:
                      | "validate"
                      | "idle"
                      | "disabled"
                      | "overQuota"
                      | "valid"
                      | "error"
                      | "loading";
                    form?: "unsubmitted" | "invalid" | "saving";
                  };
            };
        trialPlan?:
          | "verifyAvailability"
          | "trialUsed"
          | "trialUnavailable"
          | "configuring"
          | {
              configuring?:
                | "name"
                | "provider"
                | "region"
                | "form"
                | "size"
                | {
                    name?:
                      | "untouched"
                      | "empty"
                      | "invalid"
                      | "valid"
                      | "validate";
                    provider?: "untouched" | "validate" | "invalid" | "valid";
                    region?: "untouched" | "validate" | "invalid" | "valid";
                    form?: "unsubmitted" | "invalid" | "saving";
                    size?:
                      | "validate"
                      | "idle"
                      | "disabled"
                      | "overQuota"
                      | "valid"
                      | "error"
                      | "loading";
                  };
            };
      };
  tags:
    | "systemUnavailable"
    | "configurable"
    | "nameUntouched"
    | "nameEmpty"
    | "nameInvalid"
    | "nameValid"
    | "providerUntouched"
    | "providerInvalid"
    | "providerValid"
    | "regionUntouched"
    | "regionInvalid"
    | "regionValid"
    | "sizeIdle"
    | "sizeDisabled"
    | "sizeOverQuota"
    | "sizeValid"
    | "sizeError"
    | "sizeLoading"
    | "formUnsubmitted"
    | "formInvalid"
    | "formSaving";
}
