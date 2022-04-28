import { assign, createMachine, send } from "xstate";
import { ProviderInfo } from "./../../CreateKafkaInstance/machines/types";
import {
  AZ,
  CreateKafkaInitializationData,
  CreateKafkaInstanceError,
  GetSizesData,
  MakeCreateKafkaInstanceMachine,
  Provider,
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
export const SIZE_IDLE = "sizeIndle";
export const SIZE_LOADING = "sizeLoading";
export const SIZE_VALID = "sizeValid";
export const SIZE_INVALID = "sizeInvalid";
export const SIZE_UNTOUCHED = "sizeUntouched";

const CreateKafkaInstanceMachine = createMachine(
  {
    tsTypes: {} as import("./CreateKafkaInstanceMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        // initial data coming from the APIs
        capabilities: CreateKafkaInitializationData | undefined;

        // what the user is selecting
        form: {
          name?: string;
          provider?: Provider;
          region?: Region;
          az?: AZ;
          size?: Size;
        };

        // based on the form.provider selection
        selectedProvider: ProviderInfo | undefined;

        // based on the form.provider and form.region selection
        sizes: Size[] | undefined;

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
        getSizes: {
          data: GetSizesData;
        };
      },
    },

    id: "createKafkaInstance",
    context: {
      capabilities: undefined,

      form: {
        name: undefined,
        provider: undefined,
        region: undefined,
        az: undefined,
        size: undefined,
      },

      selectedProvider: undefined,
      sizes: undefined,

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
                  { cond: "noProviderAndRegion", target: "idle" },
                  { cond: "noSizes", target: "loading" },
                  { cond: "sizeIsUntouched", target: "untouched" },
                  { cond: "sizeIsValid", target: "valid" },
                  { target: "invalid" },
                ],
              },
              idle: {
                tags: SIZE_IDLE,
              },
              invalid: {
                tags: SIZE_INVALID,
              },
              valid: {
                tags: SIZE_VALID,
              },
              loading: {
                tags: SIZE_LOADING,
                invoke: {
                  src: "getSizes",
                  onDone: {
                    target: "validate",
                    actions: "setSizes",
                  },
                  onError: "validate",
                },
                description:
                  "Fetch the data required to show the available sizes and limits",
              },
            },
            on: {
              formChange: {
                target: ".validate",
              },
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
          remainingStreamingUnits,
          maxStreamingUnits,
        } = event.data;

        const allRegions = availableProviders.flatMap((p) => p.regions);

        const noRegionsAvailable =
          allRegions.every(({ isDisabled }) => isDisabled === true) ||
          allRegions.length === 0;

        const isDefaultRegionInDefaultProviderRegions =
          availableProviders
            .find((p) => defaultProvider === p.id)
            ?.regions.find((r) => r.id === defaultRegion) !== undefined;

        const selectedProvider = availableProviders.find(
          (p) => p.id === defaultProvider
        );

        return {
          form: {
            name: undefined,
            provider: defaultProvider,
            region: isDefaultRegionInDefaultProviderRegions
              ? defaultRegion
              : undefined,
            az: defaultAZ,
            size: undefined,
          },
          capabilities: {
            availableProviders,
            defaultProvider,
            defaultAZ,
            defaultRegion,
            remainingStreamingUnits,
            maxStreamingUnits,

            instanceAvailability: noRegionsAvailable
              ? "regions-unavailable"
              : instanceAvailability,
          },
          selectedProvider,
        };
      }),
      setSizes: assign((context, event) => {
        const sizes: Size[] = [...event.data.sizes];
        const smallestSize = sizes.sort(
          (a, b) => a.streamingUnits - b.streamingUnits
        )[0];
        return {
          sizes,
          form: {
            ...context.form,
            size: smallestSize,
          },
        };
      }),
      formChange: send("formChange"),
      setName: assign((context, { name }) => {
        if (context.creationError === "name-taken") {
          return { name, creationError: undefined };
        }
        return { name };
      }),
      setProvider: assign((context, { provider }) => {
        const selectedProvider = context.capabilities?.availableProviders.find(
          (p) => p.id === provider
        );
        return {
          form: {
            ...context.form,
            provider,
            region: undefined,
          },
          selectedProvider,
          sizes: undefined,
        };
      }),
      setRegion: assign((context, { region }) => ({
        form: {
          ...context.form,
          region,
        },
      })),
      setAZ: assign((context, { az }) => ({
        form: {
          ...context.form,
          az,
        },
      })),
      setSize: assign((context, { size }) => ({
        form: {
          ...context.form,
          size,
        },
      })),
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
      nameIsUntouched: ({ form }) => form.name === undefined,
      nameIsEmpty: ({ form }) =>
        form.name !== undefined && form.name.length === 0,
      nameIsValid: ({ form }) =>
        /^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(form.name || ""),
      providerIsUntouched: ({ form }) => form.provider === undefined,
      providerIsValid: ({ form, capabilities }) => {
        const selectedProviderInfo = capabilities?.availableProviders.find(
          (p) => p.id === form.provider
        );
        return (
          // must have loaded a list of providers
          (capabilities?.availableProviders || []).length > 0 &&
          // must have selected a provider
          selectedProviderInfo !== undefined
        );
      },
      regionIsUntouched: ({ form }) => form.region === undefined,
      regionIsValid: ({ form, capabilities }) => {
        const selectedProviderInfo = capabilities?.availableProviders.find(
          (p) => p.id === form.provider
        );
        return (
          // must have selected a region
          form.region !== undefined &&
          // the region must be included in the capabilities for the provider
          selectedProviderInfo?.regions.find((r) => r.id === form.region) !==
            undefined
        );
      },
      azIsUntouched: ({ form }) => form.az === undefined,
      azIsValid: ({ capabilities, form }) => {
        const selectedProviderInfo = capabilities?.availableProviders.find(
          (p) => p.id === form.provider
        );
        return (
          // must have selected an AZ
          form.az !== undefined &&
          // and it must be enabled in the capabilities for the provider
          selectedProviderInfo?.AZ[form.az] === true
        );
      },
      noProviderAndRegion: ({ form }) =>
        form.provider === undefined || form.region === undefined,
      noSizes: ({ sizes }) => sizes === undefined || sizes.length === 0,
      sizeIsUntouched: ({ form }) => form.size === undefined,
      sizeIsValid: ({ form, capabilities }) =>
        capabilities !== undefined &&
        form.size !== undefined &&
        form.size.streamingUnits <= capabilities.remainingStreamingUnits,
      canCreateInstances: ({ capabilities }) =>
        capabilities !== undefined &&
        capabilities.instanceAvailability !== undefined &&
        ["quota", "trial"].includes(capabilities.instanceAvailability),
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
  getSizes: getSizesCb,
  onCreate,
}: MakeCreateKafkaInstanceMachine) {
  return CreateKafkaInstanceMachine.withConfig({
    services: {
      getAvailableProvidersAndDefaults,
      getSizes: (context) => {
        const form = context.form as Required<typeof context.form>;
        return getSizesCb(form.provider, form.region);
      },
      createInstance: (context) => {
        return (send) => {
          const form = context.form as Required<typeof context.form>;
          function onSuccess() {
            send("createSuccess");
          }
          function onError(error: CreateKafkaInstanceError) {
            send({ type: "createError", error });
          }
          onCreate(
            {
              name: form.name,
              provider: form.provider,
              region: form.region,
              az: form.az,
              sizeId: form.size.id,
            },
            onSuccess,
            onError
          );
        };
      },
    },
  });
}
