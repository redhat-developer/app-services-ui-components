import { assign, createMachine, send } from "xstate";
import type {
  CreateKafkaInitializationData,
  CreateKafkaInstanceError,
  GetSizesData,
  MakeCreateKafkaInstanceMachine,
  Provider,
  ProviderInfo,
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
export const SYSTEM_UNAVAILABLE = "systemUnavailable";
export const SIZE_IDLE = "sizeIdle";
export const SIZE_LOADING = "sizeLoading";
export const SIZE_VALID = "sizeValid";
export const SIZE_DISABLED = "sizeDisabled";
export const SIZE_OVER_QUOTA = "sizeOverQuota";
export const SIZE_ERROR = "sizeError";

const formStates = {
  initial: "unsubmitted",
  states: {
    unsubmitted: {
      tags: "formUnsubmitted",
    },
    invalid: {
      tags: "formInvalid",
    },
    saving: {
      tags: "formSaving",
      entry: "resetCreationErrorMessage",
      invoke: {
        src: "createInstance",
      },
      on: {
        createSuccess: "#complete",
        createError: {
          actions: "setCreationError",
          target: "invalid",
        },
        create: undefined,
      },
    },
  },
  on: {
    create: [
      {
        target: ".saving",
        cond: "canSave",
        actions: "formSubmit",
      },
      {
        target: ".invalid",
        actions: "formSubmit",
      },
    ],
    formChange: {
      actions: "resetCreationErrorMessage",
      cond: "canSave",
    },
  },
};

const nameStates = {
  initial: "untouched",
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
    formSubmit: ".validate",
    nameChange: {
      actions: ["setName", "formChange"],
      target: ".validate",
    },
  },
};

const providerStates = {
  initial: "untouched",
  states: {
    untouched: { tags: PROVIDER_UNTOUCHED },
    validate: {
      always: [
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
    initDone: ".validate",
    formSubmit: ".validate",
    providerChange: {
      cond: "didProviderChange",
      actions: ["setProvider", "formChange"],
      target: ".validate",
    },
  },
};

const regionStates = {
  initial: "untouched",
  states: {
    untouched: { tags: REGION_UNTOUCHED },
    validate: {
      always: [
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
    initDone: ".validate",
    formSubmit: ".validate",
    providerChange: ".validate",
    regionChange: {
      cond: "didRegionChange",
      actions: ["setRegion", "formChange"],
      target: ".validate",
    },
  },
};

const sizeStates = {
  initial: "validate",
  states: {
    validate: {
      always: [
        { cond: "noProviderAndRegion", target: "idle" },
        { cond: "noSizes", target: "loading" },
        { cond: "emptySizes", target: "error" },
        { cond: "sizeIsDisabled", target: "disabled" },
        { cond: "sizeIsOverQuota", target: "overQuota" },
        { target: "valid" },
      ],
    },
    idle: {
      tags: SIZE_IDLE,
    },
    disabled: {
      tags: SIZE_DISABLED,
    },
    overQuota: {
      tags: SIZE_OVER_QUOTA,
    },
    valid: {
      tags: SIZE_VALID,
    },
    error: {
      tags: SIZE_ERROR,
    },
    loading: {
      tags: SIZE_LOADING,
      invoke: {
        src: "getSizes",
        onDone: {
          target: "validate",
          actions: "setSizes",
        },
        onError: "error",
      },
      description:
        "Fetch the data required to show the available sizes and limits",
    },
  },
  on: {
    formSubmit: ".validate",
    providerChange: ".validate",
    regionChange: ".validate",
    sizeChange: {
      cond: "didSizeChange",
      actions: ["setSize", "formChange"],
      target: ".validate",
    },
  },
};

export type CreateKafkaInstanceMachineContext = {
  // initial data coming from the APIs
  capabilities:
    | (CreateKafkaInitializationData & { plan: "standard" | "trial" })
    | undefined;

  // what the user is selecting
  form: {
    name?: string;
    provider?: Provider;
    region?: Region;
    size?: Size;
  };

  // based on the form.provider selection
  selectedProvider: ProviderInfo | undefined;

  // based on the form.provider and form.region selection
  sizes:
    | {
        standard: Size[];
        trial: Size;
      }
    | undefined;

  creationError: CreateKafkaInstanceError | undefined;
};

const CreateKafkaInstanceMachine = createMachine(
  {
    tsTypes: {} as import("./CreateKafkaInstanceMachine.typegen").Typegen0,
    schema: {
      context: {} as CreateKafkaInstanceMachineContext,
      events: {} as
        | { type: "initDone" }
        | { type: "formChange" }
        | { type: "formSubmit" }
        | { type: "nameChange"; name: string }
        | { type: "providerChange"; provider: Provider }
        | { type: "regionChange"; region: Region }
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
            target: "selectPlan",
            actions: ["setAvailableProvidersAndDefault", "initDone"],
          },
          onError: "systemUnavailable",
        },
        description: "Fetch the data required to drive the creation flow",
      },
      systemUnavailable: { type: "final", tags: SYSTEM_UNAVAILABLE },
      selectPlan: {
        always: [
          { cond: "canCreateStandardInstances", target: "standardPlan" },
          { cond: "canCreateTrialInstances", target: "trialPlan" },
        ],
      },
      standardPlan: {
        initial: "verifyAvailability",
        states: {
          verifyAvailability: {
            always: [
              { cond: "isOverQuota", target: "overQuota" },
              {
                cond: "isInstanceUnavailable",
                target: "instanceUnavailable",
              },
              {
                cond: "isRegionsUnavailable",
                target: "regionsUnavailable",
              },
              "configuring",
            ],
          },
          overQuota: { type: "final" },
          instanceUnavailable: { type: "final" },
          regionsUnavailable: { type: "final" },
          configuring: {
            tags: "configurable",
            type: "parallel",
            states: {
              name: nameStates,
              provider: providerStates,
              region: regionStates,
              size: sizeStates,
              form: formStates,
            },
          },
        },
      },
      trialPlan: {
        initial: "verifyAvailability",
        states: {
          verifyAvailability: {
            always: [
              { cond: "isTrialUsed", target: "trialUsed" },
              {
                cond: "isTrialUnavailable",
                target: "trialUnavailable",
              },
              "configuring",
            ],
          },
          trialUsed: { type: "final" },
          trialUnavailable: { type: "final" },
          configuring: {
            tags: "configurable",
            type: "parallel",
            states: {
              name: nameStates,
              provider: providerStates,
              region: regionStates,
              form: formStates,
              size: sizeStates,
            },
          },
        },
      },
      complete: {
        id: "complete",
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
          remainingQuota,
          maxStreamingUnits,
          plan,
        } = event.data;

        const allRegions = availableProviders.flatMap((p) => p.regions);

        const noRegionsAvailable =
          allRegions.every(({ isDisabled }) => isDisabled === true) ||
          allRegions.length === 0;

        const computedInstanceAvailability = noRegionsAvailable
          ? "regions-unavailable"
          : instanceAvailability;

        const canCreate =
          computedInstanceAvailability === "standard-available" ||
          computedInstanceAvailability === "trial-available";

        const selectedProvider = canCreate
          ? availableProviders.find((p) => p.id === defaultProvider)
          : undefined;

        return {
          form: canCreate
            ? {
                name: undefined,
                provider: defaultProvider,
                region:
                  selectedProvider?.defaultRegion ||
                  selectedProvider?.regions.filter(
                    (r) => !!r.isDisabled === false
                  )[0]?.id,
                size: undefined,
              }
            : {
                name: undefined,
                provider: undefined,
                region: undefined,
                size: undefined,
              },
          capabilities: {
            availableProviders,
            defaultProvider,
            remainingQuota,
            maxStreamingUnits,
            plan,
            instanceAvailability: computedInstanceAvailability,
          },
          selectedProvider,
        };
      }),
      setSizes: assign((context, event) => {
        const sizes: { standard: Size[]; trial: Size } = {
          standard: event.data.standard,
          trial: event.data.trial,
        };
        const smallestSize =
          context.capabilities?.plan === "trial"
            ? sizes.trial
            : sizes.standard.sort((a, b) => a.quota - b.quota)[0];
        return {
          sizes,
          form: {
            ...context.form,
            size: smallestSize,
          },
        };
      }),
      initDone: send("initDone"),
      formChange: send("formChange"),
      formSubmit: send("formSubmit"),
      setName: assign((context, { name }) => {
        if (context.creationError === "name-taken") {
          return { form: { ...context.form, name }, creationError: undefined };
        }
        return { form: { ...context.form, name } };
      }),
      setProvider: assign((context, { provider }) => {
        const selectedProvider = context.capabilities?.availableProviders.find(
          (p) => p.id === provider
        );
        return {
          form: {
            ...context.form,
            provider,
            region:
              selectedProvider?.defaultRegion ||
              selectedProvider?.regions.filter(
                (r) => !!r.isDisabled === false
              )[0]?.id,
          },
          selectedProvider,
          sizes: undefined,
        };
      }),
      setRegion: assign((context, { region }) => {
        if (context.creationError === "region-unavailable") {
          return {
            form: { ...context.form, region },
            sizes: undefined,
            creationError: undefined,
          };
        }
        return {
          form: {
            ...context.form,
            region,
          },
          sizes: undefined,
        };
      }),
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
    },
    guards: {
      isOverQuota: ({ capabilities }) =>
        capabilities === undefined ||
        capabilities.instanceAvailability === "over-quota",
      isTrialUsed: ({ capabilities }) =>
        capabilities === undefined ||
        capabilities.instanceAvailability === "trial-used",
      isInstanceUnavailable: ({ capabilities }) =>
        capabilities === undefined ||
        capabilities.instanceAvailability === "instance-unavailable",
      isRegionsUnavailable: ({ capabilities }) =>
        capabilities === undefined ||
        capabilities.instanceAvailability === "regions-unavailable",
      isTrialUnavailable: ({ capabilities }) =>
        capabilities === undefined ||
        capabilities.instanceAvailability !== "trial-available",
      nameIsEmpty: ({ form }) =>
        form.name === undefined || form.name.length === 0,
      nameIsValid: ({ form }) =>
        /^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(form.name || ""),
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
      noProviderAndRegion: ({ form }) =>
        form.provider === undefined || form.region === undefined,
      noSizes: ({ sizes }) => sizes === undefined,
      emptySizes: ({ sizes }) =>
        sizes !== undefined && sizes.standard.length === 0,
      sizeIsDisabled: ({ form, capabilities }) => {
        if (capabilities === undefined) return true;
        return form.size?.isDisabled === true;
      },
      sizeIsOverQuota: ({ form, capabilities }) => {
        if (capabilities === undefined || !form.size) return true;
        if (capabilities.plan === "trial") return false;
        return form.size.quota > capabilities.remainingQuota;
      },
      canCreateStandardInstances: ({ capabilities }) =>
        capabilities !== undefined && capabilities.plan === "standard",
      canCreateTrialInstances: ({ capabilities }) =>
        capabilities !== undefined && capabilities.plan === "trial",
      canSave: (_context, _event, meta) => {
        return (
          meta.state.hasTag(NAME_VALID) &&
          meta.state.hasTag(PROVIDER_VALID) &&
          meta.state.hasTag(REGION_VALID) &&
          meta.state.hasTag(SIZE_VALID)
        );
      },
      didProviderChange: (context, event) =>
        context.form.provider !== event.provider,
      didRegionChange: (context, event) => context.form.region !== event.region,
      didSizeChange: (context, event) =>
        context.form.size?.id !== event.size.id,
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
