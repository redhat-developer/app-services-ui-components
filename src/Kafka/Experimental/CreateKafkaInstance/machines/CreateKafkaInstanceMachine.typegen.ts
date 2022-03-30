// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setAvailableProvidersAndDefault: "done.invoke.createKafkaInstance.loading:invocation[0]";
    resetCreationErrorMessage: "formChange" | "";
    setName: "nameChange";
    formChange:
      | "nameChange"
      | "providerChange"
      | "regionChange"
      | "azChange"
      | "sizeChange";
    setProvider: "providerChange";
    setRegion: "regionChange";
    setAZ: "azChange";
    setSize: "sizeChange";
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
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getAvailableProvidersAndDefaults: "done.invoke.createKafkaInstance.loading:invocation[0]";
    createInstance: "done.invoke.createKafkaInstance.saving:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "getAvailableProvidersAndDefaults" | "createInstance";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getAvailableProvidersAndDefaults: "xstate.init";
    createInstance: "";
  };
  eventsCausingGuards: {
    canCreateInstances: "";
    canSave: "formChange" | "";
    nameIsUntouched: "";
    nameIsEmpty: "";
    nameIsValid: "";
    providerIsUntouched: "";
    providerIsValid: "";
    regionIsUntouched: "";
    regionIsValid: "";
    azIsUntouched: "";
    azIsValid: "";
    sizeIsUntouched: "";
    sizeIsValid: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "loading"
    | "systemUnavailable"
    | "verifyAvailability"
    | "cantCreate"
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
    | "configuring.az"
    | "configuring.az.untouched"
    | "configuring.az.validate"
    | "configuring.az.invalid"
    | "configuring.az.valid"
    | "configuring.size"
    | "configuring.size.untouched"
    | "configuring.size.validate"
    | "configuring.size.invalid"
    | "configuring.size.valid"
    | "submit"
    | "formInvalid"
    | "saving"
    | "complete"
    | {
        configuring?:
          | "name"
          | "provider"
          | "region"
          | "az"
          | "size"
          | {
              name?: "untouched" | "empty" | "invalid" | "valid" | "validate";
              provider?: "untouched" | "validate" | "invalid" | "valid";
              region?: "untouched" | "validate" | "invalid" | "valid";
              az?: "untouched" | "validate" | "invalid" | "valid";
              size?: "untouched" | "validate" | "invalid" | "valid";
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
    | "azUntouched"
    | "azInvalid"
    | "azValid"
    | "sizeUntouched"
    | "sizeInvalid"
    | "sizeValid";
}
