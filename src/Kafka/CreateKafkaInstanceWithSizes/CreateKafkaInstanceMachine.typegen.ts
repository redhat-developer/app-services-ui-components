// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setAvailableProvidersAndDefault: "done.invoke.createKafkaInstance.loading:invocation[0]";
    resetCreationErrorMessage: "formChange" | "";
    setName: "nameChange";
    formChange: "nameChange" | "providerChange" | "regionChange" | "sizeChange";
    setProvider: "providerChange";
    setRegion: "regionChange";
    setSize: "sizeChange";
    setSizes: "done.invoke.createKafkaInstance.configuring.size.loading:invocation[0]";
    setCreationError: "createError";
    markRequiredFields: "";
  };
  internalEvents: {
    "done.invoke.createKafkaInstance.loading:invocation[0]": {
      type: "done.invoke.createKafkaInstance.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "": { type: "" };
    "done.invoke.createKafkaInstance.configuring.size.loading:invocation[0]": {
      type: "done.invoke.createKafkaInstance.configuring.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getAvailableProvidersAndDefaults: "done.invoke.createKafkaInstance.loading:invocation[0]";
    getSizes: "done.invoke.createKafkaInstance.configuring.size.loading:invocation[0]";
    createInstance: "done.invoke.createKafkaInstance.saving:invocation[0]";
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
    createInstance: "";
  };
  eventsCausingGuards: {
    isOverQuota: "";
    isTrialUsed: "";
    isInstanceUnavailable: "";
    isRegionsUnavailable: "";
    isTrialUnavailable: "";
    canCreateInstances: "";
    canSave: "formChange" | "";
    nameIsUntouched: "";
    nameIsEmpty: "";
    nameIsValid: "";
    providerIsUntouched: "";
    providerIsValid: "";
    regionIsUntouched: "";
    regionIsValid: "";
    noProviderAndRegion: "";
    noSizes: "";
    emptySizes: "";
    sizeIsInQuota: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "loading"
    | "systemUnavailable"
    | "verifyAvailability"
    | "cantCreate"
    | "cantCreate.unknown-error"
    | "cantCreate.over-quota"
    | "cantCreate.trial-used"
    | "cantCreate.instance-unavailable"
    | "cantCreate.regions-unavailable"
    | "cantCreate.trial-unavailable"
    | "configuring"
    | "configuring.name"
    | "configuring.name.untouched"
    | "configuring.name.empty"
    | "configuring.name.invalid"
    | "configuring.name.valid"
    | "configuring.name.validate"
    | "configuring.provider"
    | "configuring.provider.untouched"
    | "configuring.provider.validate"
    | "configuring.provider.invalid"
    | "configuring.provider.valid"
    | "configuring.region"
    | "configuring.region.untouched"
    | "configuring.region.validate"
    | "configuring.region.invalid"
    | "configuring.region.valid"
    | "configuring.size"
    | "configuring.size.validate"
    | "configuring.size.idle"
    | "configuring.size.overQuota"
    | "configuring.size.valid"
    | "configuring.size.error"
    | "configuring.size.loading"
    | "submit"
    | "formInvalid"
    | "saving"
    | "complete"
    | {
        cantCreate?:
          | "unknown-error"
          | "over-quota"
          | "trial-used"
          | "instance-unavailable"
          | "regions-unavailable"
          | "trial-unavailable";
        configuring?:
          | "name"
          | "provider"
          | "region"
          | "size"
          | {
              name?: "untouched" | "empty" | "invalid" | "valid" | "validate";
              provider?: "untouched" | "validate" | "invalid" | "valid";
              region?: "untouched" | "validate" | "invalid" | "valid";
              size?:
                | "validate"
                | "idle"
                | "overQuota"
                | "valid"
                | "error"
                | "loading";
            };
      };
  tags:
    | "systemUnavailable"
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
    | "sizeOverQuota"
    | "sizeValid"
    | "sizeError"
    | "sizeLoading";
}
