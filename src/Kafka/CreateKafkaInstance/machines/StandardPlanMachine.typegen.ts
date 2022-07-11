// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setCreationError: "createError";
    setName: "nameChange";
    setProvider: "providerChange";
    setRegion: "regionChange";
    setSize: "sizeChange";
    setSizes: "done.invoke.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
    setInitialContext: "xstate.init";
    triggerSubmit: "create";
    resetCreationErrorMessage:
      | "done.state.standardPlanMachine.configuring.fields"
      | "submit";
    triggerSave: "submit";
    fieldInvalid:
      | ""
      | "error.platform.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
  };
  internalEvents: {
    "done.invoke.standardPlanMachine.configuring.fields.size.loading:invocation[0]": {
      type: "done.invoke.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "": { type: "" };
    "error.platform.standardPlanMachine.configuring.fields.size.loading:invocation[0]": {
      type: "error.platform.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getSizes: "done.invoke.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
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
    | "configuring.status"
    | "configuring.status.unsubmitted"
    | "configuring.status.submitted"
    | "configuring.form"
    | "configuring.form.invalid"
    | "configuring.form.valid"
    | "configuring.form.saving"
    | "configuring.form.saved"
    | "configuring.fields"
    | "configuring.fields.name"
    | "configuring.fields.name.empty"
    | "configuring.fields.name.invalid"
    | "configuring.fields.name.valid"
    | "configuring.fields.name.validate"
    | "configuring.fields.provider"
    | "configuring.fields.provider.validate"
    | "configuring.fields.provider.invalid"
    | "configuring.fields.provider.valid"
    | "configuring.fields.region"
    | "configuring.fields.region.validate"
    | "configuring.fields.region.invalid"
    | "configuring.fields.region.valid"
    | "configuring.fields.size"
    | "configuring.fields.size.validate"
    | "configuring.fields.size.idle"
    | "configuring.fields.size.disabled"
    | "configuring.fields.size.overQuota"
    | "configuring.fields.size.valid"
    | "configuring.fields.size.error"
    | "configuring.fields.size.loading"
    | "saved"
    | {
        configuring?:
          | "status"
          | "form"
          | "fields"
          | {
              status?: "unsubmitted" | "submitted";
              form?: "invalid" | "valid" | "saving" | "saved";
              fields?:
                | "name"
                | "provider"
                | "region"
                | "size"
                | {
                    name?: "empty" | "invalid" | "valid" | "validate";
                    provider?: "validate" | "invalid" | "valid";
                    region?: "validate" | "invalid" | "valid";
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
    | "blocked"
    | "unsubmitted"
    | "submitted"
    | "formInvalid"
    | "creatable"
    | "formSaving"
    | "configurable"
    | "nameEmpty"
    | "nameInvalid"
    | "nameValid"
    | "providerInvalid"
    | "providerValid"
    | "regionInvalid"
    | "regionValid"
    | "sizeIdle"
    | "sizeDisabled"
    | "sizeOverQuota"
    | "sizeValid"
    | "sizeError"
    | "sizeLoading";
}
