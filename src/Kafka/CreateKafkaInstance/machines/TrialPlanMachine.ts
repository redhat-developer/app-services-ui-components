import { assign, createMachine, send } from "xstate";
import { sendParent } from "xstate/lib/actions";
import {
  CreateKafkaInstanceError,
  TrialSizes,
  Provider,
  ProviderInfo,
  Region,
  Size,
  TrialPlanInitializationData,
} from "../types";

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

export type TrialPlanMachineContext = {
  // initial data coming from the APIs
  capabilities: TrialPlanInitializationData;

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
  sizes: TrialSizes | undefined;

  creationError: CreateKafkaInstanceError | undefined;
};

export const TrialPlanMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBLAhgGwArcwDsBZTAYwAt1CwA6ANzAwDMBPAQXs3QICMf0AF1YBiRKAAOAe1hD0UwuJAAPRAEYATAGYAHLQDsGtQE4ArDoAMO0wDYLGgCwAaEK0TGLtY8a03dxtX1TNTVTYwBfcJc0LDwCEnIqGloyBWZ0KABXDEIoWkJMAFs6Lmx0CExBMDEkEGlZQXlFWtUEB1DaNR1NLWNrfV6tQJc3BGN9PX0HAK0LOxDx00jojBx8IlJKajpUwnSsnLyC4pFmKVRCgGVM3kKhJXq5BSVWtXsR9Qsp2hsAgN+tFpHDYdMsQDE1vFNkkdmkMtlqEcitVjmAAMIUIgwB4yJ7NUCvd6udzmAzBIzTbpfAJgiFxDaJbYpOEHRG0CSoKT0cpMBg4cqVao4hpNF6IUwWNS0DTdDRBHSWN6zfQfNo6BxeSX6Hx9ByWcy01b0hJbZK7fYI3LsznciBMU7nK43O6CYV4sUIN4aVU2UxaAx9UJdSU2NQOLSG2LrE0w5l7eGHa1cnmoEQc5N21AYrFgN2NZ4tT7e4ltGz6TWaEFBQES4w2SOQhmm2Hx1lW1BgKBNPllCpVGqSXH5-EqRDTf0WIYy4HaDSmIKq0IDWjzhz6CYWCzBHQ+BvG6FM80JtkdrsKB0Xa63e61R7Dj1excgjQrr7mWbzwJ9PfRg9mlmWnkp5NGmNoptmuS5reQ6ioWnpEqMah+BqfrzvoVg6FoUwTD+UKMv+raAbQwHniRhAQdi0EigWBJFouDh6j8ujdLMWGUvouFNrGR5tnksgAF4lPyfZClR7pwRumrGOGfjSV0Ng2KqGi+lKDhbtYyo6HOficTGh4AYmAl0NgUiYBAiIiBACh0NQ9BSAA1nQdK-vhLYWoZ6CCbQJlmYiCC2VIZCVE0ADaFgALp5rBtGlqYXh1h43QSg4ZZaEpAxSlo4a6PoNgMXKphLFE4JGi5zZxu5bJGd5pnmbkIhMJyqDsgQghnBctDOXh5U8UR1U+XVUD+YQdlBcOYWRWJ95wSlcXeL8VihBYKUDEpIL+lhQabhoylzBGxVdVx+mER5gmgRmTAUVBg7USOhLFqMGg+OWEyOPKkrWClul-m5x5WkZIhkVdUU0aO8EPYgMo7rQVJhN0irWEVKxRt13EGWy7WFLQsCYNy9VkB2grXGQZBwPAU3RWDPSTEYZiWNYdiOEpvieDYcqWEM0lBPWB2lajx2VVamPY7jFkE2AgoAKKoE1IN3Ygfh6GY0llpoCzGBDCA7fYnR2GEynmOqhjfa5FV-XkmMiOLgpyw+cpKWGGpYZuXxzKGvocbzKNHQRgsW46F6FMDFOg60oZ6Kla7obOhWKSWJhWLQKW-BoViAnWGiRMVhBSHa5MoHzPslEw6BsJw3B8AIwi2zNmuBFKGt5cnoR6hYu5e42enJIIRoAKqwJANcxUGejKXOQJqY4OirfH+gN8pDEKS3ljt8jnc-bQPexL3BRcDwmC8Ng111DBodjprjieBrWrhrHm4OCbPXo1aqK0JkhCCFImSUIPIfy+Di41BAh+H4dC84gSzGsI-NGJ02SvzAIUCQ1c-4egUp4EI08gRljLDoX0i4tzGB+N0OsSEBh+imNAgW5t8jIloLZYSQ8qaBE1ClBUvhcq2DwfHOUrNyR5QIeuHCHd9ym16omV+pRyiMNeNoLwWEJTmDnnlLoKpuGSh+KuSwO0Qi-Eob7ahEjhI2xQXBOUL4tBhF0KYN6E9lr4LCEQkw7syFsT0b9XiNDijSMQBMVUmCyRTGnpfZWns14iKfrAq06ZbS8nfp-b+FBf43XEsPBwcVlreBVr4XUaTVRzylLlbw1hJQmG1KCYRZUYF+yTDE5qkiRLeIQBYvQaTnppKME9J6zgSx+kIdYYMSovi5UzhU-m+iPHRJTHQkaDCTHDzsF4Uwa49rahKYVPJlgDCgM0EEVO3g1BuLNhMsCmYexSLmWDQwcU7BDEMLMHaKU1Cql6TDbckpJxDLZocsRbJJmZkab4ksugXweCCO0SUEDQjfOfkBTs3Y4lfx-hARpYYr6OD6P0TCa446IRXknAYMoTBITSXMaFkTYVnkIGchpFzWgWM8Hs3QIRJzBFsE+GUK43o7kMDcixZLqlkWmfUlFtgYZPV+LYNJEo5jdMQlMTwa4zBfAcAVCIoyi5HKIoK4VtKfHLWlG3bKuVNCLHZXoaxa5uW7RrPy6hZEAU6EXL4f0eUJRWL1IrEZYTKlUI8dVepxjknTRiorWgVggjkKykE4w6VSRAlCNYw2ylxi2r9Z5GyEAj4oq3ChLKDEsKOH8GlEsBU9DxsKnOBUybQklW9l3dxfV020EaucRpobw2FSwlGwwMaS1lnLCzccHNAQ6XVfWzVp1jK1URNmi+eVCGp2wlYHwuDJypsbV5AaSST63Q9EYOKVizBDArV0cMSlzAMqAZhUpyE1XerGQ2ydDqlLTDitrN4KrfA7WkuuxMwt36wGdEIKoyLdWemAXqcM2pxhqTQTiyGk9pTKRMO0XKkof1jo3j8oWjohWzKDZTVo9Mw0eAUtJBidZi2PX3T8Setg55ZS6F62t69REwtoMLHGeMoCNM5knZ6WltRhmyfBrWKGYahFmG+BihgH6YbY+Sjjjps1UchgQ2gWE-AgjDLgpZcn70auwzxsDSzVSzEITMDwezPzeGhYgo+VQUWDDkUAt4SydPjGZksn4SENZzlYVGtxKLHXx3KZEIAA */
  createMachine(
    {
      context: {
        capabilities: {} as TrialPlanInitializationData,
        selectedProvider: undefined,
        sizes: undefined,
        form: {},
        creationError: undefined,
      },
      tsTypes: {} as import("./TrialPlanMachine.typegen").Typegen0,
      schema: {
        context: {} as TrialPlanMachineContext,
        events: {} as
          | { type: "formChange" }
          | { type: "formSubmit" }
          | { type: "nameChange"; name: string }
          | { type: "providerChange"; provider: Provider }
          | { type: "regionChange"; region: Region }
          | { type: "nameIsValid" }
          | { type: "nameIsInvalid" }
          | { type: "nameIsTaken" }
          | { type: "create" }
          | { type: "createSuccess" }
          | { type: "createError"; error: CreateKafkaInstanceError },
        services: {} as {
          getSizes: {
            data: TrialSizes;
          };
        },
      },
      id: "TrialPlanMachine",
      initial: "verifyAvailability",
      states: {
        verifyAvailability: {
          always: [
            {
              cond: "isTrialUsed",
              target: "trialUsed",
            },
            {
              cond: "isTrialUnavailable",
              target: "trialUnavailable",
            },
            {
              target: "configuring",
            },
          ],
        },
        trialUsed: {
          type: "final",
        },
        trialUnavailable: {
          type: "final",
        },
        configuring: {
          tags: "configurable",
          type: "parallel",
          states: {
            name: {
              initial: "untouched",
              states: {
                untouched: {
                  tags: "nameUntouched",
                },
                empty: {
                  tags: "nameEmpty",
                },
                invalid: {
                  tags: "nameInvalid",
                },
                valid: {
                  tags: "nameValid",
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
                    {
                      target: "invalid",
                    },
                  ],
                },
              },
              on: {
                formSubmit: {
                  target: ".validate",
                },
                nameChange: {
                  actions: ["setName", "formChange"],
                  target: ".validate",
                },
              },
            },
            provider: {
              initial: "untouched",
              states: {
                untouched: {
                  tags: "providerUntouched",
                },
                validate: {
                  always: [
                    {
                      cond: "providerIsValid",
                      target: "valid",
                    },
                    {
                      target: "invalid",
                    },
                  ],
                },
                invalid: {
                  tags: "providerInvalid",
                },
                valid: {
                  tags: "providerValid",
                },
              },
              on: {
                formSubmit: {
                  target: ".validate",
                },
                providerChange: {
                  actions: ["setProvider", "formChange"],
                  cond: "didProviderChange",
                  target: ".validate",
                },
              },
            },
            region: {
              initial: "untouched",
              states: {
                untouched: {
                  tags: "regionUntouched",
                },
                validate: {
                  always: [
                    {
                      cond: "regionIsValid",
                      target: "valid",
                    },
                    {
                      target: "invalid",
                    },
                  ],
                },
                invalid: {
                  tags: "regionInvalid",
                },
                valid: {
                  tags: "regionValid",
                },
              },
              on: {
                formSubmit: {
                  target: ".validate",
                },
                providerChange: {
                  target: ".validate",
                },
                regionChange: {
                  actions: ["setRegion", "formChange"],
                  cond: "didRegionChange",
                  target: ".validate",
                },
              },
            },
            size: {
              initial: "validate",
              states: {
                validate: {
                  always: [
                    {
                      cond: "noProviderAndRegion",
                      target: "idle",
                    },
                    {
                      cond: "noSizes",
                      target: "loading",
                    },
                    {
                      cond: "emptySizes",
                      target: "error",
                    },
                    {
                      target: "loaded",
                    },
                  ],
                },
                idle: {
                  tags: "sizeIdle",
                },
                error: {
                  tags: "sizeError",
                },
                loading: {
                  description:
                    "Fetch the data required to show the available sizes and limits",
                  invoke: {
                    src: "getSizes",
                    onDone: [
                      {
                        actions: "setSizes",
                        target: "validate",
                      },
                    ],
                    onError: [
                      {
                        target: "error",
                      },
                    ],
                  },
                  tags: "sizeLoading",
                },
                loaded: {},
              },
              on: {
                providerChange: {
                  target: ".validate",
                },
                regionChange: {
                  target: ".validate",
                },
              },
            },
            form: {
              initial: "unsubmitted",
              states: {
                unsubmitted: {
                  tags: "formUnsubmitted",
                },
                invalid: {
                  tags: "formInvalid",
                },
                saving: {
                  entry: ["resetCreationErrorMessage", "triggerSave"],
                  tags: "formSaving",
                  on: {
                    createSuccess: {
                      target: "#TrialPlanMachine.complete",
                    },
                    createError: {
                      actions: "setCreationError",
                      target: "invalid",
                    },
                  },
                },
              },
              on: {
                create: [
                  {
                    actions: "formSubmit",
                    cond: "canSave",
                    target: ".saving",
                  },
                  {
                    actions: "formSubmit",
                    target: ".invalid",
                  },
                ],
                formChange: {
                  actions: "resetCreationErrorMessage",
                  cond: "canSave",
                },
              },
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
        formChange: send("formChange"),
        formSubmit: send("formSubmit"),
        setName: assign((context, { name }) => {
          if (context.creationError === "name-taken") {
            return {
              form: { ...context.form, name },
              creationError: undefined,
            };
          }
          return { form: { ...context.form, name } };
        }),
        setProvider: assign((context, { provider }) => {
          const selectedProvider =
            context.capabilities?.availableProviders.find(
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
        setSizes: assign((_context, event) => {
          const sizes = event.data;
          return {
            sizes,
          };
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resetCreationErrorMessage: assign((_context) => ({
          creationError: undefined,
        })),
        setCreationError: assign((_context, { error }) => ({
          creationError: error,
        })),
        triggerSave: (context) => {
          sendParent({ type: "save", data: context.form });
        },
      },
      guards: {
        isTrialUsed: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "trial-used",
        isTrialUnavailable: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "trial-unavailable",
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
        canSave: (_context, _event, meta) => {
          return (
            meta.state.hasTag(NAME_VALID) &&
            meta.state.hasTag(PROVIDER_VALID) &&
            meta.state.hasTag(REGION_VALID)
          );
        },
        didProviderChange: (context, event) =>
          context.form.provider !== event.provider,
        didRegionChange: (context, event) =>
          context.form.region !== event.region,
      },
    }
  );
