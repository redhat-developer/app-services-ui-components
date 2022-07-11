import { assign, createMachine, send, sendParent } from "xstate";
import {
  CloudProvider,
  CreateKafkaInstanceError,
  Region,
  TrialPlanInitializationData,
  TrialSizes,
} from "../types";
import { onProviderChange } from "./shared";

export type TrialPlanMachineContext = {
  // initial data coming from the APIs
  capabilities: TrialPlanInitializationData;

  // what the user is selecting
  form: {
    name?: string;
    provider?: CloudProvider;
    region?: Region;
  };

  // based on the form.provider and form.region selection
  sizes: TrialSizes | undefined;

  creationError: CreateKafkaInstanceError | undefined;
};

export const TrialPlanMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBLAhgGwArcwDsBZTAYwAt1CwA6ANzAwDMBPAQXs3QICMf0AF1YBiRKAAOAe1hD0UwuJAAPRACYAbAA4AnLQ0AGNQBYArBo0BmHQHYNNywBoQrRDoO1bARjWmv54y8DY18AX1DnNCw8AhJyKhpaMgVmdCgAVwxCKFpYQUxBdNgRMlQwArAlaVlBeUUkFUQgtWdXBFNLY1o7LRDTG1NTLVNjG3DIjBx8IlJKajpkwlSMrJzmKVQAWwYcdAgRVLBsCABJQi5sPaqZOQUlVQQvLRs9NR1TI1Mdey0tNS1Wk1nqZaJodIEbEYTAZ7OMQFEprFZgkFik0plqGsNtsLnsSmUKtcanV7kCXqD3p9vjZfv9AQg1AYhrQDF4fH9jJ0aVo4QiYjN4vMkmiVpjaOstrlMPRMfjyoIwABldJkMhweANaq3eqgB5qSxqGwsgwmgzPHRBGxeemMrQeCwfAY6NT6s2mXmTflxOaJRbLDHZcXYqUy7JyioAUVQqA2RO1pIZBqNppN5st1pcTR04O6gX+9hMefdEXhnum3pRwqW6NWQa2B3QR1O512EDjtTuDQe-i+tD+Jpdxm0NhdpnpXlGXTNnIt-RCnOLE2i5eRQr9NbFh2OsFohEwmzouIgFTEmpuHZ1jQQxmG3VHfjUE7Zb3HGlGoK8Vo0-ksli0Vh0D1lyRQVfRFAM1kbbdd33MADmxZVeE2IR2xJLsmgNccbECWgvAsGwBkhBwb0sIDEQFH1UWrUVAy3CAdz3A8REYsAAGEKCIGBUM7XUMJaTNHg0QZQU5Axf0MYxRmwsivVXMDqIg8UoPo2gJBjGUICYHZLmPBVT0kc80N49o3lBQxgnBLkmQBATH20Wghy8WxnS0IJLA0GSV1Aqj-VrOidzUqQNKYeCtkQ5DBG4y9u0w2zLCePs33cxkmW0IdPJAyiq18zdlIC9S9hCwLgtQdjOMqM9iR4q8vFito7JBd4XhpGF-FGDKKMrdcaMgpsdzKKA6m0vYTyihNTEfY0TH-aFzGCccni6G8DGzf9WSE9KSz5Lysu6xT-NoAa6lCzZwpQyr43Qx46qaN4vFoawR1HT8Jv6DqKzXcC-Lyw6wEGhQRGKwrSo47IKoMqror48cTEsByOhItlLD8P93rknyN1on6joBnHCDKsGxqu2r+LaIJ3FoEYRytYYkZCNHvOyzHeug2QAC9D1bUaLovBNnjh2xnn-A1hgmmz6rtLRugMZrhhvJzF1LYDOs+hTvr63J0A52hsCkTAIFlCAFDoah6CkABrOhtsyrqvtyjX2boXX9cxBBTakMgCjqABtAwAF0ieM4x3k8O0jCc2qNDum0Bg0bpKXihxvmsYwGd2u2sYdrWnb1g2wyYGNUFUghBAlbZrZV+Scsz1ns513PXfdz2L19gOeaMq9g8asPHwtZKLRjs0+xRv5DHJzQ09ttX7drjmTrOyL2+qmLSfUC0uhMDRsysbRNH8SfVerlmVMdwGCs0kHysDmqboQSxgnuvD9THq1szCLayxtw-maUrO57xgmXEl5Q2uqvO+Zo9BBCsJCSwI5rA8g-srD6Vcf7+REEbRIeQKi0ArsgjGPVf7bmvt2QI90-BCx0PFWBXcbQPweoMLeidHyfAPignq6Dja5HyAqHBn9K74IgsQ9Q2g9CGBMOYACdgHBYU5KHay2FkbOhdOEEshApCaQ1CgPheCGBMHQGwTg3A+ACGEEI68YC8J6AtBHew35-wWDUKwugghPQAFVYCQDMW8ewuE+hsjZIMXwr4rFsgtLYp4Fgo5ONoC46Iri9xcB4JgXg2BwYgC1LzK6IQbR-j7FoJMYkhIRxpNEvGsB4nSiMck1JZjskCSCB4cEMtOQiNGDLLw0S9q1iwYUHc6RCCwHSEhIQCo2zAITM0ekQ4QTNSfhCbM9NEHkR0V0sUPSii5CGRFUZXj8mUwaayP4eFkb9HpNoOGkIVodBePYMSitcHoyZgQ9Zmj0mGWXogGk9I-weD+EMbMZpWTiVTks2SjNVm0WDKbVsXjg5xxlv+Zyj4CIWMRaCBhgwmQjD+KRUFO0p5HzrDiGF4ziaDD0P2KEQ5nijloStRKMIvjDmGMjTpGcsSSlgNKTEXiTRGleiaCaFprF0qlhNBWLomTHI8nir+bD9rBi5YwMZENLrGRMN8FkNIt4vGRSOWh2F9Ao1qu8Do+SZVLmWY8iFHLNhmJ-CCSlg5hy0vqX+SBtV2TPz-G8Nl08a4qRYrQfpggpAqgoJ40lxl-BqFBLoWBFhYEwn1E4epLwPVYr+K5dN9ztHWvZYQwNsFaBgE2BIUxUarwjilkJAYmh7DIxTVhTQuF+gcjsJQ38YxZX8KeftH6QboU6XtbfJysCWQdGnE1CaMs-WEoOkGo89rDUumZdmfof48Ljn-FLM0Tw7JOQsHO1BA7i1HkJJWh4nRY0WgGHhXQxhpzGGbXHfwNITAdt-LA49BCF2wXtWacc5hY3iPBEK5ovQf39o1kDC+wbCChvDZG1VmTo2Gusj4OcDghh2ByXYPse6wl3u-N2y1YL07+uPvlIKwNhq6TSRkjuV7-zww+P4NkQ4CKpvqi6e6IRmm6EZOu0jSsrXgoLQdWDWkh1XEvU0Do3RhzBzZEYb4ZgbSSRmS8MwbH77KJ7SsiTP0pNFyXXJhAd7KYOA5OSnQdowEukmvx7CgmVpNSg+raCJmAPi3UIC0O2gLK6HYx5meKk8bwcQ5QZDbzIYTK3p4N4nRAgfHzDCccQ5XjYW0AreKPxQsBv6n9Ia56FRmNgVLJy2E-DOiZPFHQMNx0zhHBxoSD6CtUd+v9QgtAZMqti2qmqwd9DWGpCjF0sCxxuuG50Fa35nQ-mkgZ-NlHC1Fe63RsxDgPB4Q+H+ecjIXz1P1EaGctigXDBEw88Tq2Dp4x8+OQVVnzK0yTO5Dra3Nba1Kwx95ID7CiPyXYL4wdDTfBtH3EbFlvxfsZLisj+Lv6-p+o7XrEAanmY4yCMehoTCHqEjaX4lXQeb38NvD7B1UdmZQ0x9QCnfCuXih8QYQQOgQ5HLhC0JohLaHwrmpBK350o7rgXWM5mLC7u-GCTkkltBTfqvYI0yMALzmnVdvNN2hd-xzi7bII6HP2C6GlTk+S-k+Ap8LjmD3bL-O6J6gYwRpn72W5rk9fUzG9HpJQ2NElqsvUCPD0T5GCXMzMSMb5Mth5Dn1N8Wm2holKpi4xj5DJ7OeEKbobT2ExJYXHd8XeIwRG2HVwL7y9rfOPAQeEIAA */
  createMachine(
    {
      context: {
        capabilities: {} as TrialPlanInitializationData,
        sizes: undefined,
        form: {},
        creationError: undefined,
      },
      tsTypes: {} as import("./TrialPlanMachine.typegen").Typegen0,
      schema: {
        context: {} as TrialPlanMachineContext,
        events: {} as
          | { type: "fieldInvalid" }
          | { type: "nameChange"; name: string }
          | { type: "providerChange"; provider: CloudProvider }
          | { type: "regionChange"; region: Region }
          | { type: "nameIsValid" }
          | { type: "nameIsInvalid" }
          | { type: "nameIsTaken" }
          | { type: "submit" }
          | { type: "create" }
          | { type: "createSuccess" }
          | { type: "createError"; error: CreateKafkaInstanceError },
        services: {} as {
          getSizes: {
            data: TrialSizes;
          };
        },
      },
      initial: "verifyAvailability",
      id: "TrialPlanMachine",
      states: {
        verifyAvailability: {
          entry: "setInitialContext",
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
          tags: "blocked",
        },
        trialUnavailable: {
          tags: "blocked",
        },
        regionsUnavailable: {
          tags: "blocked",
        },
        configuring: {
          type: "parallel",
          states: {
            status: {
              initial: "unsubmitted",
              states: {
                unsubmitted: {
                  tags: "unsubmitted",
                },
                submitted: {
                  entry: "triggerSubmit",
                  tags: "submitted",
                },
              },
              on: {
                create: {
                  description:
                    "Save is enabled all the time, if it's clicked before the form is completely filled out we should show the validation for all errored fields",
                  target: ".submitted",
                },
              },
            },
            form: {
              initial: "invalid",
              states: {
                invalid: {
                  tags: "formInvalid",
                },
                valid: {
                  entry: "resetCreationErrorMessage",
                  on: {
                    fieldInvalid: {
                      target: "invalid",
                    },
                    submit: {
                      target: "saving",
                    },
                  },
                },
                saving: {
                  entry: ["resetCreationErrorMessage", "triggerSave"],
                  tags: "formSaving",
                  on: {
                    createSuccess: {
                      target: "saved",
                    },
                    createError: {
                      actions: "setCreationError",
                      target: "invalid",
                    },
                  },
                },
                saved: {
                  type: "final",
                },
              },
              on: {
                fieldInvalid: {
                  description:
                    "sent by the fields when their value change to an invalid value. This will transition the form to the invalid state, to then eventually transition to the valid state if the field state is marked as done (which means that all fields have a valid value selected)",
                  target: ".invalid",
                },
              },
            },
            fields: {
              tags: "configurable",
              type: "parallel",
              states: {
                name: {
                  initial: "validate",
                  states: {
                    empty: {
                      tags: "nameEmpty",
                    },
                    invalid: {
                      entry: "fieldInvalid",
                      tags: "nameInvalid",
                    },
                    valid: {
                      tags: "nameValid",
                      type: "final",
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
                    create: {
                      target: ".validate",
                    },
                    nameChange: {
                      actions: "setName",
                      target: ".validate",
                    },
                  },
                },
                provider: {
                  initial: "validate",
                  states: {
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
                      entry: "fieldInvalid",
                      tags: "providerInvalid",
                    },
                    valid: {
                      tags: "providerValid",
                      type: "final",
                    },
                  },
                  on: {
                    create: {
                      target: ".validate",
                    },
                    providerChange: {
                      actions: "setProvider",
                      cond: "didProviderChange",
                      target: ".validate",
                    },
                  },
                },
                region: {
                  initial: "validate",
                  states: {
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
                      entry: "fieldInvalid",
                      tags: "regionInvalid",
                    },
                    valid: {
                      tags: "regionValid",
                      type: "final",
                    },
                  },
                  on: {
                    create: {
                      target: ".validate",
                    },
                    providerChange: {
                      target: ".validate",
                    },
                    regionChange: {
                      actions: "setRegion",
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
                          target: "valid",
                        },
                      ],
                    },
                    idle: {
                      entry: "fieldInvalid",
                      tags: "sizeIdle",
                    },
                    valid: {
                      tags: "sizeValid",
                      type: "final",
                    },
                    error: {
                      entry: "fieldInvalid",
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
                    create: {
                      target: ".validate",
                    },
                    providerChange: {
                      target: ".validate",
                    },
                    regionChange: {
                      target: ".validate",
                    },
                  },
                },
              },
              onDone: {
                target: "#TrialPlanMachine.configuring.form.valid",
              },
            },
          },
          onDone: {
            target: "saved",
          },
        },
        saved: {
          type: "final",
        },
      },
    },
    {
      actions: {
        setInitialContext: assign((context) => {
          return {
            form: {
              ...(context.capabilities.defaultProvider
                ? onProviderChange(
                    context.capabilities.availableProviders,
                    context.capabilities.defaultProvider
                  )
                : {}),
            },
          };
        }),
        fieldInvalid: send("fieldInvalid"),
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
          return {
            form: {
              ...context.form,
              ...onProviderChange(
                context.capabilities.availableProviders,
                provider
              ),
            },
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
        triggerSave: sendParent((context) => ({
          type: "save",
          data: context.form,
        })),
        triggerSubmit: send("submit"),
      },
      guards: {
        isTrialUsed: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "used",
        isTrialUnavailable: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "unavailable",
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
        didProviderChange: (context, event) =>
          context.form.provider !== event.provider,
        didRegionChange: (context, event) =>
          context.form.region !== event.region,
      },
    }
  );
