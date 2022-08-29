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
    unsetSubscription: "providerChange";
    setBillingToSubscription: "selectSubscription" | "";
    setBillingToPrepaid: "selectPrepaid" | "";
    setInitialContext: "xstate.init";
    triggerSubmit: "create";
    resetCreationErrorMessage:
      | "done.state.standardPlanMachine.configuring.fields"
      | "submit";
    triggerSave: "submit";
    fieldInvalid:
      | ""
      | "error.platform.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
    triggerBillingChange: "selectSubscription" | "selectPrepaid";
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
    noProviderOrRegion: "";
    noSizes: "";
    emptySizes: "";
    sizeIsDisabled: "";
    billingRequiredButNotSelected: "";
    sizeIsOverQuota: "";
    onlyPrepaid: "";
    singleSubscription: "";
    onlySubscriptions: "";
    matchesSelectedProviderOrRHMarketplaceAndHasQuota: "selectSubscription";
    noSelectedProvider: "selectSubscription";
    hasPrepaidQuota: "selectPrepaid";
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
    | "configuring.fields.size.waitingForQuota"
    | "configuring.fields.size.overQuota"
    | "configuring.fields.size.valid"
    | "configuring.fields.size.error"
    | "configuring.fields.size.loading"
    | "configuring.fields.billing"
    | "configuring.fields.billing.validate"
    | "configuring.fields.billing.prepaidOnly"
    | "configuring.fields.billing.singleSubscription"
    | "configuring.fields.billing.onlySubscriptions"
    | "configuring.fields.billing.onlySubscriptions.invalid"
    | "configuring.fields.billing.onlySubscriptions.valid"
    | "configuring.fields.billing.prepaidAndSubscriptions"
    | "configuring.fields.billing.prepaidAndSubscriptions.empty"
    | "configuring.fields.billing.prepaidAndSubscriptions.subscription"
    | "configuring.fields.billing.prepaidAndSubscriptions.prepaid"
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
                | "billing"
                | {
                    name?: "empty" | "invalid" | "valid" | "validate";
                    provider?: "validate" | "invalid" | "valid";
                    region?: "validate" | "invalid" | "valid";
                    size?:
                      | "validate"
                      | "idle"
                      | "disabled"
                      | "waitingForQuota"
                      | "overQuota"
                      | "valid"
                      | "error"
                      | "loading";
                    billing?:
                      | "validate"
                      | "prepaidOnly"
                      | "singleSubscription"
                      | "onlySubscriptions"
                      | "prepaidAndSubscriptions"
                      | {
                          onlySubscriptions?: "invalid" | "valid";
                          prepaidAndSubscriptions?:
                            | "empty"
                            | "subscription"
                            | "prepaid";
                        };
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
    | "sizeWaitingForQuota"
    | "sizeOverQuota"
    | "sizeValid"
    | "sizeError"
    | "sizeLoading"
    | "noBilling"
    | "billingValid"
    | "singleSubscription";
}
