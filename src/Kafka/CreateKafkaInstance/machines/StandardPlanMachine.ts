import { assign, createMachine, send } from "xstate";
import { sendParent } from "xstate/lib/actions";
import {
  CreateKafkaInstanceError,
  StandardSizes,
  Provider,
  ProviderInfo,
  Region,
  Size,
  StandardPlanInitializationData,
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
export const SIZE_IDLE = "sizeIdle";
export const SIZE_LOADING = "sizeLoading";
export const SIZE_VALID = "sizeValid";
export const SIZE_DISABLED = "sizeDisabled";
export const SIZE_OVER_QUOTA = "sizeOverQuota";
export const SIZE_ERROR = "sizeError";

export type StandardPlanMachineContext = {
  // initial data coming from the APIs
  capabilities: StandardPlanInitializationData;

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
  sizes: Size[] | undefined;

  creationError: CreateKafkaInstanceError | undefined;
};

export const StandardPlanMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4EMB2E0CcIAUAbTAWTQGMALASwzADoA3MHagMwE8BBRta4gEb9qKDgGJEoAA4B7WCOoyMkkAA9EAZgAsAdnoBOAAwBWAIwAmU4Y2GdOjQA4ANCA6JzG4-WOHr2nVoOvgBsDgC+YS6omNh4RKQUNHT05Eps1FAArqwYUPQYaAC2DLyE1NgoYBJIILLyKIrKNeoI5nb0FjrB+lrGDsFmDqbGLm4Iphoa+vSWWp76dj7DOhFR6Fi4BMQYZFS0DKkY6Vk5eQXFYmwyOIUAypkChSIqdQpKKi0AtBrBHRo6+n0wR+OgsRmCo0QpjmXlmk10oR+GnMqxA0Q2cW2uySBzSGWytDORSq5zAAGFKJgYC85G8mqAvj8-gCgSCwYYIa4oRpTNM4RZTA4At0VpE0etYlsEntkodjgTcvQpDgZIxyiwmGgyhUqjT6o0PppguZ6F0ORM5jpzCFIeMgSbDIDTNCtNZocZUejJfEdol9ik8SdCUqVWqICxLtc7g8nig9XTDQhvr9gsELP1zENU7YRlzWoYPPRHfpBeZehZAh6xV7Nj7sf65fjTiHVeqcGJla3wzgKVSwPGGu9mohk-RU+njVngjnbYL-kXAeZjFo2kLjPpPRLa1i-bLAwq8jgwFBGprtWhKtVpLTB-S1CPtPR+mnDENzEuHL19LbzAMtDMtH0a1jB0Athk3GJt2lHEAyOJtgyPE8lEjG57keZ4aleW9E30DQi3MHpAOCLolk5MYPB6J8uh5f4HEcHQhQgjEpV9GVcTgoNFUQxoO1DNte1yftMJvA1h1aTMn2NQxegCMsgVTH8pn-IVgQmBj6MY6st0xaCG33ZtuOQwyMAE6lhP1IcGUQLQrHoeirFCNMHHfUxFMolSaPUoVNLWSCdNYmDG04vIrhuehYDQNVcjEcgjwvMB7nIcg4HgcyEzE50zCfNoemCXpU1w21P1hXR9Do3oQPsYImO9Hc2Ng+Vm1CwpwsiwkYriyoAFEcBVHAB1EqyEGXLxkVdUxjT6JydFnDlpkMTLpN-Zcgi0GqoICvSOIPehmo6sB4oGyz71aK0OiW3kQgY1y8zsPCAiCNMKyFKZ1v8+s922pqoxQwpTKE68LLvFoAQcGYjB8CqgK0QCitBbxrWnQVoW0Tw3pYj72Ma4N5AALxKLVyniq9ahE46WgFDorQFFH1wmG6xm0AjvCsAiFvfIFcPRutdyx+DFTxhhCBkNAIHaiAlAYWhGBkABrBga3e3mGv5vJBfoYXRcJBBpZkcgL0aABtQwAF0juBxAhjw38gICHRjGInkGc0PpTDs0FkVfBaGLmbm6sC-SceofGNZFsXopYPqlWIFBmvC7SMeVoKdvVzXw6gHWMBl-Xb2Ns20uwsStG6AxpI5AJTCtGxbFtRxrSLH53wBObbb93TPuxgXg6qZq0Njc3E0CE0fh8EfHSFDkyM0V8wbsR6HAdoCCzbzaO9V8Lu94rsWH+gexO+E1QWcx1pMFK1QlrkwvCXqYlyMIYgRXzGVeCjf8bEYzd4LwaToIk0CLmIEXC05MzODzDYBws8GKvh6K+UIy4n5J0Dl3d+gsv6A3SkNB6HRjCWGWmWdSl9IGmmgboK0CxBThFRBgGQ4ZUrIATjzeqzBWCcB4HwQQwhRB7yGp8IYRZXQUSAsiBi-QfzM18AtVkq4yHVS0n5RO9VVQsAAIqZBkOgHhJ19DLnwvYSYARehLh-GmDorI8p9B8NYNoiD6q0HRMlAAqgUXg-A0ACEIADUmQMcKWDHMRHRS4Hqo1rpMIsvhLC8mnHYGytiYLGVgM4yKHD3GeK0S0ICXg5ieH6MWQUZVbSummD8BYHh7BzGWHEranciTFHoJkDAKAZCZCoJAdJD5fhqUBMCYi7Ip7jEAtbaEFgDGT2hFUter9ST0DAIUKQ3Dv7k0QLgk0wwHBlWsFXawWhZwrkMDMYZC8YbOgWnI3yzEmEBy+sGaZ0tCYQHaUmeu75b6BF6A-ewYCxgTR5Acgx9hFwGImXzKZxIzzlEeZ8aEZjfwL1wflYw-wZp5mGMaP59trCfh6F0YFL8drTNKETSojyLQzFCARf4vTbCBF2c8w5y4bJWAmri5OzZSSQunMybpbI2b9JGf+WYf8PA8k-BoFlyC8idjDBqBpTSWmUDaYsi2CBfg2VCMjXwuVJg-l5GDcezkfBlWLiieRFz-bVPXlKts4KdSPMsNMIwApfyVwYoCXM5FvYLiMDDN0MCqHnNqu3EFO0rXdnoHc7Udrh4QPWcad8xhlxtB1RIsq9sgQJuKiagNG1n6suDKGjUhKHlKsTH0PQE1HLSUyeCH8nriy-jGrghl4rrmKgLf1Et+9OXjkzJOCtM4UX2wdICuYZZdDaBbTU+gxl6mNOaa04tGDC68OhXMPKPqJr6KrT+fo0xlyOgBCBIEvRJ3rxnUWw6nbeF4QmgRQE8xPYnOReRfdBheiAXtm+PKp7X4zojRCq9v9cHeAWjmMwy5iI7LzG0doNkSyeAscRM54oFGXItb+48p4i12r6N4ZEPJAggksPbExn4xx3uLsuZYYrTWBtXsGgymHjpYR-l8XDz4rBvg-F+RSjoqLGlws5HRwCf07Tjg02AMYRCVEXd4zBJ1vg3s6NTECzkh22nsHoXBfgphdAmtJUT30wr-tkyxpZrRAQLmBICOw7ouizWckWZ0uhKGQMmFWbNSt6p5sVHHCKUUoCPMTfQQIQwJploLOsoqEwAIshXBVGGWaUNmqDXiozhRIUgQ6Mpywqm2i4NtAME02n4SOA5K6NatGc1INbWrbuNrL1LtY9ZBaMx+iZXpjZEwtdKHeHfZ4fKL5KuecUVcqd6tyhpMAy0QIehdBzDKrgyBnRa66C8KB5EuFbOVkM0HEOYsIoeMVU18znxfxUwtKmz8MSxHgNUk56x8C7CihG2hyZKd6vKJwGojRaBIVhMFCKDwb4eQ6NrqBX4XQlzWlAg7YEHnkt0dzRKt+BNI3Tesv0A5Ax1lCbc18o0dEHvIiRgCOwu2UEMEjtcR5L5wYDDTEBIILra73dA5mMwojrAU7qyHNOhI7VGFNMseSJ9tAw1riWYpugPDRNdJPHnqPMvlt3VXEHvJ3XuAWPsm+58R4Tqq15sbqtIVkZ7RmKcA6xhHoRn4XQC8LAcnFXMzxxKMcDOkkWOmPh8tWBXEVRwppSpWkAkYKHwLIWcf8ROTM-aSMooduE72wJ7AOxeRECIQA */
  createMachine(
    {
      context: {
        capabilities: {} as StandardPlanInitializationData,
        selectedProvider: undefined,
        sizes: undefined,
        form: {},
        creationError: undefined,
      },
      tsTypes: {} as import("./StandardPlanMachine.typegen").Typegen0,
      schema: {
        context: {} as StandardPlanMachineContext,
        events: {} as
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
          getSizes: {
            data: StandardSizes;
          };
        },
      },
      id: "standardPlanMachine",
      initial: "verifyAvailability",
      states: {
        verifyAvailability: {
          always: [
            {
              cond: "isOverQuota",
              target: "overQuota",
            },
            {
              cond: "isInstanceUnavailable",
              target: "instanceUnavailable",
            },
            {
              cond: "isRegionsUnavailable",
              target: "regionsUnavailable",
            },
            {
              target: "configuring",
            },
          ],
        },
        overQuota: {
          type: "final",
        },
        instanceUnavailable: {
          type: "final",
        },
        regionsUnavailable: {
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
                      target: "#complete",
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
                      cond: "sizeIsDisabled",
                      target: "disabled",
                    },
                    {
                      cond: "sizeIsOverQuota",
                      target: "overQuota",
                    },
                    {
                      target: "valid",
                    },
                  ],
                },
                idle: {
                  tags: "sizeIdle",
                },
                disabled: {
                  tags: "sizeDisabled",
                },
                overQuota: {
                  tags: "sizeOverQuota",
                },
                valid: {
                  tags: "sizeValid",
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
              },
              on: {
                formSubmit: {
                  target: ".validate",
                },
                providerChange: {
                  target: ".validate",
                },
                regionChange: {
                  target: ".validate",
                },
                sizeChange: {
                  actions: ["setSize", "formChange"],
                  cond: "didSizeChange",
                  target: ".validate",
                },
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
        setSizes: assign((context, event) => {
          const sizes = event.data;
          const smallestSize = sizes.sort((a, b) => a.quota - b.quota)[0];
          return {
            sizes,
            form: {
              ...context.form,
              size: smallestSize,
            },
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
        isOverQuota: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "over-quota",
        isInstanceUnavailable: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "instance-unavailable",
        isRegionsUnavailable: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "regions-unavailable",
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
        emptySizes: ({ sizes }) => sizes !== undefined && sizes.length === 0,
        sizeIsDisabled: ({ form, capabilities }) => {
          if (capabilities === undefined) return true;
          return form.size?.isDisabled === true;
        },
        sizeIsOverQuota: ({ form, capabilities }) => {
          if (capabilities === undefined || !form.size) return true;
          return form.size.quota > capabilities.remainingQuota;
        },
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
        didRegionChange: (context, event) =>
          context.form.region !== event.region,
        didSizeChange: (context, event) =>
          context.form.size?.id !== event.size.id,
      },
    }
  );
