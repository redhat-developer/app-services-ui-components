import { assign, createMachine, send } from "xstate";
import {
  AZ,
  CreateKafkaInitializationData,
  CreateKafkaInstanceError,
  InstanceAvailability,
  MakeCreateKafkaInstanceMachine,
  Provider,
  Providers,
  Region,
  Size,
} from "./types";

export const NAME_EMPTY = "nameEmpty";
export const NAME_INVALID = "nameInvalid";
export const NAME_UNTOUCHED = "nameUntouched";
export const NAME_VALID = "nameValid";
export const PROVIDER_UNTOUCHED = "providerUntouched";
export const PROVIDER_VALID = "providerValid";
export const PROVIDER_INVALID = "providerInvalid";
export const REGION_UNTOUCHED = "regionUntouched";
export const REGION_VALID = "regionValid";
export const REGION_INVALID = "regionInvalid";
export const AZ_UNTOUCHED = "azUntouched";
export const AZ_VALID = "azValid";
export const AZ_INVALID = "azInvalid";
export const SYSTEM_UNAVAILABLE = "systemUnavailable";
export const SIZE_VALID = "sizeValid";
export const SIZE_INVALID = "sizeInvalid";
export const SIZE_UNTOUCHED = "sizeUntouched";

const CreateKafkaInstanceMachine = createMachine(
  {
    tsTypes: {} as import("./CreateKafkaInstanceMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        name: string | undefined;
        provider: Provider | undefined;
        region: Region | undefined;
        az: AZ | undefined;
        size: Size | undefined;
        defaultProvider: Provider | undefined;
        defaultRegion: Region | undefined;
        defaultAZ: AZ | undefined;
        availableProviders: Providers;
        instanceAvailability: InstanceAvailability | undefined;

        creationError: CreateKafkaInstanceError | undefined;
      },
      events: {} as
        | { type: "formChange" }
        | { type: "nameChange"; name: string }
        | { type: "providerChange"; provider: Provider }
        | { type: "regionChange"; region: Region }
        | { type: "azChange"; az: AZ }
        | { type: "sizeChange"; size: Size }
        | { type: "nameIsValid" }
        | { type: "nameIsInvalid" }
        | { type: "nameIsTaken" }
        | { type: "create" }
        | { type: "createSuccess" }
        | { type: "createError"; error: CreateKafkaInstanceError },
      services: {} as {
        getAvailableProvidersAndDefaults: {
          data: CreateKafkaInitializationData;
        };
      },
    },

    id: "createKafkaInstance",
    context: {
      name: undefined,
      provider: undefined,
      region: undefined,
      az: undefined,
      size: undefined,

      defaultProvider: undefined,
      defaultRegion: undefined,
      defaultAZ: undefined,
      availableProviders: [],
      instanceAvailability: undefined,

      creationError: undefined,
    },
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: "getAvailableProvidersAndDefaults",
          onDone: {
            target: "verifyAvailability",
            actions: "setAvailableProvidersAndDefault",
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
                actions: ["setName", "formChange"],
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
                actions: ["setProvider", "formChange"],
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
                actions: ["setRegion", "formChange"],
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
                actions: ["setAZ", "formChange"],
                target: ".validate",
              },
            },
          },
          size: {
            initial: "validate",
            states: {
              untouched: { tags: SIZE_UNTOUCHED },
              validate: {
                always: [
                  { cond: "sizeIsUntouched", target: "untouched" },
                  { cond: "sizeIsValid", target: "valid" },
                  { target: "invalid" },
                ],
              },
              invalid: {
                tags: SIZE_INVALID,
              },
              valid: {
                tags: SIZE_VALID,
              },
            },
            on: {
              sizeChange: {
                actions: ["setSize", "formChange"],
                target: ".validate",
              },
            },
          },
        },
        on: {
          create: "submit",
          formChange: {
            actions: "resetCreationErrorMessage",
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
        entry: "markRequiredFields",
        always: "configuring",
      },
      saving: {
        entry: "resetCreationErrorMessage",
        invoke: {
          src: "createInstance",
        },
        on: {
          createSuccess: "complete",
          createError: {
            actions: "setCreationError",
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
    actions: {
      setAvailableProvidersAndDefault: assign((_context, event) => {
        const {
          availableProviders,
          defaultProvider,
          instanceAvailability,
          defaultAZ,
          defaultRegion,
        } = event.data;

        const allRegions = availableProviders.flatMap((p) => p.regions);

        const noRegionsAvailable =
          allRegions.every(({ isDisabled }) => isDisabled === true) ||
          allRegions.length === 0;

        const isDefaultRegionInDefaultProviderRegions =
          availableProviders
            .find((p) => defaultProvider === p.id)
            ?.regions.find((r) => r.id === defaultRegion) !== undefined;

        return {
          ...event.data,
          provider: defaultProvider,
          region: isDefaultRegionInDefaultProviderRegions
            ? defaultRegion
            : undefined,
          az: defaultAZ,
          instanceAvailability: noRegionsAvailable
            ? "regions-unavailable"
            : instanceAvailability,
        };
      }),
      formChange: send("formChange"),
      setName: assign((context, { name }) => {
        if (context.creationError === "name-taken") {
          return { name, creationError: undefined };
        }
        return { name };
      }),
      setProvider: assign((_context, { provider }) => ({
        provider,
        region: undefined,
      })),
      setRegion: assign((_context, { region }) => ({ region })),
      setAZ: assign((_context, { az }) => ({ az })),
      setSize: assign((_context, { size }) => ({ size })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resetCreationErrorMessage: assign((_context) => ({
        creationError: undefined,
      })),
      setCreationError: assign((_context, { error }) => ({
        creationError: error,
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      markRequiredFields: assign((_context) => ({
        creationError: "form-invalid" as CreateKafkaInstanceError,
      })),
    },
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
      sizeIsUntouched: (c) => c.size === undefined,
      sizeIsValid: (c) => c.size !== undefined,
      canCreateInstances: (context) =>
        context.instanceAvailability !== undefined &&
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
  }
);

export function makeCreateKafkaInstanceMachine({
  getAvailableProvidersAndDefaults,
  onCreate,
}: MakeCreateKafkaInstanceMachine) {
  return CreateKafkaInstanceMachine.withConfig({
    services: {
      getAvailableProvidersAndDefaults,
      createInstance: (context) => {
        return (send) => {
          function onSuccess() {
            send("createSuccess");
          }
          function onError(error: CreateKafkaInstanceError) {
            send({ type: "createError", error });
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
  });
}
