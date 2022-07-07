// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setName: "nameChange";
    formChange: "nameChange" | "providerChange" | "regionChange" | "sizeChange";
    setProvider: "providerChange";
    setRegion: "regionChange";
    formSubmit: "create";
    resetCreationErrorMessage: "formChange" | "create";
    setCreationError: "createError";
    setSize: "sizeChange";
    setSizes: "done.invoke.standardPlanMachine.configuring.size.loading:invocation[0]";
    triggerSave: "create";
  };
  internalEvents: {
    "done.invoke.standardPlanMachine.configuring.size.loading:invocation[0]": {
      type: "done.invoke.standardPlanMachine.configuring.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getSizes: "done.invoke.standardPlanMachine.configuring.size.loading:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "getSizes";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getSizes: "";
  };
  eventsCausingGuards: {
    isOverQuota: "";
    isInstanceUnavailable: "";
    isRegionsUnavailable: "";
    nameIsEmpty: "";
    nameIsValid: "";
    didProviderChange: "providerChange";
    providerIsValid: "";
    didRegionChange: "regionChange";
    regionIsValid: "";
    canSave: "create" | "formChange";
    didSizeChange: "sizeChange";
    noProviderAndRegion: "";
    noSizes: "";
    emptySizes: "";
    sizeIsDisabled: "";
    sizeIsOverQuota: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "verifyAvailability"
    | "overQuota"
    | "instanceUnavailable"
    | "regionsUnavailable"
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
    | "configuring.form"
    | "configuring.form.unsubmitted"
    | "configuring.form.invalid"
    | "configuring.form.saving"
    | "configuring.size"
    | "configuring.size.validate"
    | "configuring.size.idle"
    | "configuring.size.disabled"
    | "configuring.size.overQuota"
    | "configuring.size.valid"
    | "configuring.size.error"
    | "configuring.size.loading"
    | "complete"
    | {
        configuring?:
          | "name"
          | "provider"
          | "region"
          | "form"
          | "size"
          | {
              name?: "untouched" | "empty" | "invalid" | "valid" | "validate";
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
  tags:
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
    | "formUnsubmitted"
    | "formInvalid"
    | "formSaving"
    | "sizeIdle"
    | "sizeDisabled"
    | "sizeOverQuota"
    | "sizeValid"
    | "sizeError"
    | "sizeLoading";
}
