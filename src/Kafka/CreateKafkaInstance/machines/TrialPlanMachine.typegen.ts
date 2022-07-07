// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setName: "nameChange";
    formChange: "nameChange" | "providerChange" | "regionChange";
    setProvider: "providerChange";
    setRegion: "regionChange";
    setSizes: "done.invoke.TrialPlanMachine.configuring.size.loading:invocation[0]";
    formSubmit: "create";
    resetCreationErrorMessage: "formChange" | "create";
    setCreationError: "createError";
    triggerSave: "create";
  };
  internalEvents: {
    "done.invoke.TrialPlanMachine.configuring.size.loading:invocation[0]": {
      type: "done.invoke.TrialPlanMachine.configuring.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getSizes: "done.invoke.TrialPlanMachine.configuring.size.loading:invocation[0]";
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
    isTrialUsed: "";
    isTrialUnavailable: "";
    nameIsEmpty: "";
    nameIsValid: "";
    didProviderChange: "providerChange";
    providerIsValid: "";
    didRegionChange: "regionChange";
    regionIsValid: "";
    noProviderAndRegion: "";
    noSizes: "";
    emptySizes: "";
    canSave: "create" | "formChange";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "verifyAvailability"
    | "trialUsed"
    | "trialUnavailable"
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
    | "configuring.size.error"
    | "configuring.size.loading"
    | "configuring.size.loaded"
    | "configuring.form"
    | "configuring.form.unsubmitted"
    | "configuring.form.invalid"
    | "configuring.form.saving"
    | "complete"
    | {
        configuring?:
          | "name"
          | "provider"
          | "region"
          | "size"
          | "form"
          | {
              name?: "untouched" | "empty" | "invalid" | "valid" | "validate";
              provider?: "untouched" | "validate" | "invalid" | "valid";
              region?: "untouched" | "validate" | "invalid" | "valid";
              size?: "validate" | "idle" | "error" | "loading" | "loaded";
              form?: "unsubmitted" | "invalid" | "saving";
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
    | "sizeIdle"
    | "sizeError"
    | "sizeLoading"
    | "formUnsubmitted"
    | "formInvalid"
    | "formSaving";
}
