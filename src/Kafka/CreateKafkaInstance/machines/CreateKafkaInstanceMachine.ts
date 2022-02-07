import { useMachine } from "@xstate/react";
import { useCallback } from "react";
import { assign, DoneInvokeEvent, send } from "xstate";
import { CreateKafkaInstanceModel } from "./CreateKafkaInstanceModel";
import {
  AZ,
  Provider,
  CreateKafkaInstanceError,
  CreateKafkaInitializationData,
  MakeCreateKafkaInstanceMachine,
  Region,
} from "./types";

const setName = CreateKafkaInstanceModel.assign((context, { name }) => {
  if (context.creationError === "name-taken") {
    return { name, creationError: undefined };
  }
  return { name };
}, "nameChange");
const setProvider = CreateKafkaInstanceModel.assign(
  (_context, { provider }) => ({ provider, region: undefined }),
  "providerChange"
);
const setRegion = CreateKafkaInstanceModel.assign(
  (_context, { region }) => ({ region }),
  "regionChange"
);
const setAZ = CreateKafkaInstanceModel.assign(
  (_context, { az }) => ({ az }),
  "azChange"
);
const resetCreationErrorMessage = CreateKafkaInstanceModel.assign(
  () => ({
    creationError: undefined,
  }),
  "formChange"
);
const setCreationError = CreateKafkaInstanceModel.assign(
  (_context, { error }) => ({ creationError: error }),
  "createError"
);
const markRequiredFields = CreateKafkaInstanceModel.assign(
  () => ({ creationError: "form-invalid" }),
  "createError"
);

const NAME_EMPTY = "nameEmpty";
const NAME_INVALID = "nameInvalid";
const NAME_UNTOUCHED = "nameUntouched";
const NAME_VALID = "nameValid";
const PROVIDER_UNTOUCHED = "providerUntouched";
const PROVIDER_VALID = "providerValid";
const PROVIDER_INVALID = "providerInvalid";
const REGION_UNTOUCHED = "regionUntouched";
const REGION_VALID = "regionValid";
const REGION_INVALID = "regionInvalid";
const AZ_UNTOUCHED = "azUntouched";
const AZ_VALID = "azValid";
const AZ_INVALID = "azInvalid";
const SYSTEM_UNAVAILABLE = "systemUnavailable";

export function makeCreateKafkaInstanceMachine({
  getAvailableProvidersAndDefaults,
  onCreate,
}: MakeCreateKafkaInstanceMachine): ReturnType<
  typeof CreateKafkaInstanceModel.createMachine
> {
  return CreateKafkaInstanceModel.createMachine(
    {
      id: "createKafkaInstance",
      context: {
        ...CreateKafkaInstanceModel.initialContext,
      },
      initial: "loading",
      states: {
        loading: {
          invoke: {
            src: getAvailableProvidersAndDefaults,
            onDone: {
              target: "verifyAvailability",
              actions: assign(
                (
                  _context,
                  event: DoneInvokeEvent<CreateKafkaInitializationData>
                ) => ({
                  ...event.data,
                  provider: event.data.defaultProvider,
                  az: event.data.defaultAZ,
                })
              ),
            },
            onError: "systemUnavailable",
          },
          description: "Fetch the data required to drive the creation flow",
        },
        systemUnavailable: { type: "final", tags: SYSTEM_UNAVAILABLE },
        verifyAvailability: {
          always: [
            { cond: "canCreateInstances", target: "configuring" },
            { target: "cantCreate" },
          ],
        },
        cantCreate: {
          type: "final",
        },
        configuring: {
          type: "parallel",
          states: {
            name: {
              initial: "validate",
              states: {
                untouched: { tags: NAME_UNTOUCHED },
                empty: {
                  tags: NAME_EMPTY,
                },
                invalid: {
                  tags: NAME_INVALID,
                },
                valid: {
                  tags: NAME_VALID,
                },
                validate: {
                  always: [
                    {
                      cond: "nameIsUntouched",
                      target: "untouched",
                    },
                    {
                      cond: "nameIsEmpty",
                      target: "empty",
                    },
                    {
                      cond: "nameIsValid",
                      target: "valid",
                    },
                    { target: "invalid" },
                  ],
                },
              },
              on: {
                nameChange: {
                  actions: [
                    setName,
                    send(CreateKafkaInstanceModel.events.formChange()),
                  ],
                  target: ".validate",
                },
              },
            },
            provider: {
              initial: "validate",
              states: {
                untouched: { tags: PROVIDER_UNTOUCHED },
                validate: {
                  always: [
                    { cond: "providerIsUntouched", target: "untouched" },
                    { cond: "providerIsValid", target: "valid" },
                    { target: "invalid" },
                  ],
                },
                invalid: {
                  tags: PROVIDER_INVALID,
                },
                valid: {
                  tags: PROVIDER_VALID,
                },
              },
              on: {
                providerChange: {
                  actions: [
                    setProvider,
                    send(CreateKafkaInstanceModel.events.formChange()),
                  ],
                  target: ".validate",
                },
              },
            },
            region: {
              initial: "validate",
              states: {
                untouched: { tags: REGION_UNTOUCHED },
                validate: {
                  always: [
                    { cond: "regionIsUntouched", target: "untouched" },
                    { cond: "regionIsValid", target: "valid" },
                    { target: "invalid" },
                  ],
                },
                invalid: {
                  tags: REGION_INVALID,
                },
                valid: {
                  tags: REGION_VALID,
                },
              },
              on: {
                regionChange: {
                  actions: [
                    setRegion,
                    send(CreateKafkaInstanceModel.events.formChange()),
                  ],
                  target: ".validate",
                },
              },
            },
            az: {
              initial: "validate",
              states: {
                untouched: { tags: AZ_UNTOUCHED },
                validate: {
                  always: [
                    { cond: "azIsUntouched", target: "untouched" },
                    { cond: "azIsValid", target: "valid" },
                    { target: "invalid" },
                  ],
                },
                invalid: {
                  tags: AZ_INVALID,
                },
                valid: {
                  tags: AZ_VALID,
                },
              },
              on: {
                azChange: {
                  actions: [
                    setAZ,
                    send(CreateKafkaInstanceModel.events.formChange()),
                  ],
                  target: ".validate",
                },
              },
            },
          },
          on: {
            create: "submit",
            formChange: {
              actions: resetCreationErrorMessage,
              cond: "canSave",
            },
          },
        },
        submit: {
          always: [
            {
              cond: "canSave",
              target: "saving",
            },
            { target: "formInvalid" },
          ],
        },
        formInvalid: {
          entry: markRequiredFields,
          always: "configuring",
        },
        saving: {
          entry: resetCreationErrorMessage,
          invoke: {
            src: "createInstance",
          },
          on: {
            createSuccess: "complete",
            createError: {
              actions: setCreationError,
              target: "configuring",
            },
          },
        },
        complete: {
          type: "final",
        },
      },
    },
    {
      guards: {
        nameIsUntouched: (c) => c.name === undefined,
        nameIsEmpty: (c) => c.name !== undefined && c.name.length === 0,
        nameIsValid: (c) => /^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(c.name || ""),
        providerIsUntouched: (c) => c.provider === undefined,
        providerIsValid: (c) => {
          const selectedProviderInfo = c.availableProviders.find(
            (p) => p.id === c.provider
          );
          return (
            // must have loaded a list of providers
            c.availableProviders.length > 0 &&
            // must have selected a provider
            selectedProviderInfo !== undefined
          );
        },
        regionIsUntouched: (c) => c.region === undefined,
        regionIsValid: (c) => {
          const selectedProviderInfo = c.availableProviders.find(
            (p) => p.id === c.provider
          );
          return (
            // must have selected a region
            c.region !== undefined &&
            // the region must be included in the capabilities for the provider
            selectedProviderInfo?.regions.find((r) => r.id === c.region) !==
              undefined
          );
        },
        azIsUntouched: (c) => c.az === undefined,
        azIsValid: (c) => {
          const selectedProviderInfo = c.availableProviders.find(
            (p) => p.id === c.provider
          );
          return (
            // must have selected an AZ
            c.az !== undefined &&
            // and it must be enabled in the capabilities for the provider
            selectedProviderInfo?.AZ[c.az] === true
          );
        },
        canCreateInstances: (context) =>
          ["quota", "trial"].includes(context.instanceAvailability),
        canSave: (_context, _event, meta) => {
          return (
            meta.state.hasTag(NAME_VALID) &&
            meta.state.hasTag(PROVIDER_VALID) &&
            meta.state.hasTag(REGION_VALID) &&
            meta.state.hasTag(AZ_VALID)
          );
        },
      },
      services: {
        createInstance: (context) => {
          return (send) => {
            function onSuccess() {
              send(CreateKafkaInstanceModel.events.createSuccess());
            }
            function onError(error: CreateKafkaInstanceError) {
              send(CreateKafkaInstanceModel.events.createError({ error }));
            }
            onCreate(
              {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                name: context.name!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                provider: context.provider!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                region: context.region!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                az: context.az!,
              },
              onSuccess,
              onError
            );
          };
        },
      },
    }
  );
}

export function useCreateKafkaInstanceMachine({
  getAvailableProvidersAndDefaults,
  onCreate,
}: MakeCreateKafkaInstanceMachine) {
  const [state, send] = useMachine(
    () =>
      makeCreateKafkaInstanceMachine({
        getAvailableProvidersAndDefaults,
        onCreate,
      }),
    { devTools: true }
  );

  const selectedProviderInfo = state.context.availableProviders.find(
    (p) => p.id === state.context.provider
  );

  const setName = useCallback(
    (name: string) =>
      send(CreateKafkaInstanceModel.events.nameChange({ name })),
    [send]
  );
  const setProvider = useCallback(
    (provider: Provider) =>
      send(CreateKafkaInstanceModel.events.providerChange({ provider })),
    [send]
  );
  const setRegion = useCallback(
    (region: Region) =>
      send(CreateKafkaInstanceModel.events.regionChange({ region })),
    [send]
  );
  const setAZ = useCallback(
    (az: AZ) => send(CreateKafkaInstanceModel.events.azChange({ az })),
    [send]
  );
  const create = useCallback(
    () => send(CreateKafkaInstanceModel.events.create()),
    [send]
  );

  const isFormInvalid = state.context.creationError === "form-invalid";
  const isNameTaken = state.context.creationError === "name-taken";

  return {
    name: state.context.name,
    provider: state.context.provider,
    region: state.context.region,
    az: state.context.az,

    azOptions: selectedProviderInfo?.AZ,
    regions: selectedProviderInfo?.regions,

    availableProviders: state.context.availableProviders,
    instanceAvailability: state.context.instanceAvailability,

    isNameInvalid: state.hasTag(NAME_INVALID),
    isNameEmpty: state.hasTag(NAME_EMPTY),
    isNameError:
      state.hasTag(NAME_INVALID) ||
      isNameTaken ||
      (!state.hasTag(NAME_VALID) && isFormInvalid),
    isNameTaken,

    isProviderError: !state.hasTag(PROVIDER_VALID) && isFormInvalid,
    isRegionError: !state.hasTag(REGION_VALID) && isFormInvalid,
    isAzError: !state.hasTag(AZ_VALID) && isFormInvalid,

    isTrial: ["trial", "trial-used", "trial-unavailable"].includes(
      state.context.instanceAvailability
    ),
    isLoading: state.matches("loading"),
    isSaving: state.matches("saving"),
    canCreate: state.matches("configuring"),
    canSave: state.can("create"),
    isSystemUnavailable: state.hasTag(SYSTEM_UNAVAILABLE),

    error: state.context.creationError,

    setName,
    setProvider,
    setRegion,
    setAZ,
    create,
  };
}
