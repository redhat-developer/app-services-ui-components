// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.standardPlanMachine.configuring.fields.size.loading:invocation[0]": {
      type: "done.invoke.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
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
  eventsCausingActions: {
    fieldInvalid:
      | ""
      | "error.platform.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
    resetCreationErrorMessage:
      | "done.state.standardPlanMachine.configuring.fields"
      | "submit";
    setBillingToPrepaid: "selectPrepaid";
    setBillingToSubscription: "selectSubscription";
    setCreationError: "createError";
    setInitialContext: "xstate.init";
    setName: "nameChange";
    setProvider: "providerChange";
    setRegion: "regionChange";
    setSize: "sizeChange";
    setSizes: "done.invoke.standardPlanMachine.configuring.fields.size.loading:invocation[0]";
    triggerBillingChange: "selectPrepaid" | "selectSubscription";
    triggerSave: "submit";
    triggerSubmit: "create";
    unsetSubscription: "providerChange";
  };
  eventsCausingServices: {
    getSizes: "";
  };
  eventsCausingGuards: {
    billingRequiredButNotSelected: "";
    didProviderChange: "providerChange";
    didRegionChange: "regionChange";
    didSizeChange: "sizeChange";
    emptySizes: "";
    hasPrepaidQuota: "selectPrepaid";
    isInstanceUnavailable: "";
    isOverQuota: "";
    isRegionsUnavailable: "";
    matchesSelectedProviderOrRHMarketplaceAndHasQuota: "selectSubscription";
    nameIsEmpty: "";
    nameIsValid: "";
    noProviderOrRegion: "";
    noSelectedProvider: "selectSubscription";
    noSizes: "";
    onlyPrepaid: "";
    onlySubscriptions: "";
    providerIsValid: "";
    regionIsValid: "";
    singleSubscription: "";
    sizeIsDisabled: "";
    sizeIsOverQuota: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "configuring"
    | "configuring.fields"
    | "configuring.fields.billing"
    | "configuring.fields.billing.onlySubscriptions"
    | "configuring.fields.billing.onlySubscriptions.invalid"
    | "configuring.fields.billing.onlySubscriptions.valid"
    | "configuring.fields.billing.prepaidAndSubscriptions"
    | "configuring.fields.billing.prepaidAndSubscriptions.empty"
    | "configuring.fields.billing.prepaidAndSubscriptions.prepaid"
    | "configuring.fields.billing.prepaidAndSubscriptions.subscription"
    | "configuring.fields.billing.prepaidOnly"
    | "configuring.fields.billing.singleSubscription"
    | "configuring.fields.billing.validate"
    | "configuring.fields.name"
    | "configuring.fields.name.empty"
    | "configuring.fields.name.invalid"
    | "configuring.fields.name.valid"
    | "configuring.fields.name.validate"
    | "configuring.fields.provider"
    | "configuring.fields.provider.invalid"
    | "configuring.fields.provider.valid"
    | "configuring.fields.provider.validate"
    | "configuring.fields.region"
    | "configuring.fields.region.invalid"
    | "configuring.fields.region.valid"
    | "configuring.fields.region.validate"
    | "configuring.fields.size"
    | "configuring.fields.size.disabled"
    | "configuring.fields.size.error"
    | "configuring.fields.size.idle"
    | "configuring.fields.size.loading"
    | "configuring.fields.size.overQuota"
    | "configuring.fields.size.valid"
    | "configuring.fields.size.validate"
    | "configuring.fields.size.waitingForQuota"
    | "configuring.form"
    | "configuring.form.invalid"
    | "configuring.form.saved"
    | "configuring.form.saving"
    | "configuring.form.valid"
    | "configuring.status"
    | "configuring.status.submitted"
    | "configuring.status.unsubmitted"
    | "instanceUnavailable"
    | "overQuota"
    | "regionsUnavailable"
    | "saved"
    | "verifyAvailability"
    | {
        configuring?:
          | "fields"
          | "form"
          | "status"
          | {
              fields?:
                | "billing"
                | "name"
                | "provider"
                | "region"
                | "size"
                | {
                    billing?:
                      | "onlySubscriptions"
                      | "prepaidAndSubscriptions"
                      | "prepaidOnly"
                      | "singleSubscription"
                      | "validate"
                      | {
                          onlySubscriptions?: "invalid" | "valid";
                          prepaidAndSubscriptions?:
                            | "empty"
                            | "prepaid"
                            | "subscription";
                        };
                    name?: "empty" | "invalid" | "valid" | "validate";
                    provider?: "invalid" | "valid" | "validate";
                    region?: "invalid" | "valid" | "validate";
                    size?:
                      | "disabled"
                      | "error"
                      | "idle"
                      | "loading"
                      | "overQuota"
                      | "valid"
                      | "validate"
                      | "waitingForQuota";
                  };
              form?: "invalid" | "saved" | "saving" | "valid";
              status?: "submitted" | "unsubmitted";
            };
      };
  tags:
    | "billingValid"
    | "blocked"
    | "configurable"
    | "creatable"
    | "formInvalid"
    | "formSaving"
    | "nameEmpty"
    | "nameInvalid"
    | "nameValid"
    | "noBilling"
    | "providerInvalid"
    | "providerValid"
    | "regionInvalid"
    | "regionValid"
    | "singleSubscription"
    | "sizeDisabled"
    | "sizeError"
    | "sizeIdle"
    | "sizeLoading"
    | "sizeOverQuota"
    | "sizeValid"
    | "sizeWaitingForQuota"
    | "submitted"
    | "unsubmitted";
}
