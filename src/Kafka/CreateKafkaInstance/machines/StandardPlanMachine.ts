import { assign, createMachine, send } from "xstate";
import { sendParent } from "xstate/lib/actions";
import {
  CreateKafkaInstanceError,
  StandardSizes,
  CloudProvider,
  CloudProviderInfo,
  Region,
  Size,
  StandardPlanInitializationData,
} from "../types";

export type StandardPlanMachineContext = {
  // initial data coming from the APIs
  capabilities: StandardPlanInitializationData;

  // what the user is selecting
  form: {
    name?: string;
    provider?: CloudProvider;
    region?: Region;
    size?: Size;
  };

  // based on the form.provider selection
  selectedProvider: CloudProviderInfo | undefined;

  // based on the form.provider and form.region selection
  sizes: StandardSizes | undefined;

  creationError: CreateKafkaInstanceError | undefined;
};

export const StandardPlanMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4EMB2E0CcIAUAbTAWTQGMALASwzADoA3MHagMwE8BBRta4gEb9qKDgGJEoAA4B7WCOoyMkkAA9EAJgBsATgAM9bVoAsADj0B2HcYCMNgKz2ANCA6J99HRZsaAzF-1fMz0NAF9Ql1RMbDwiUgoaOnpyJTZqKABXVgwoeiiUDNgxchwwNBQwFVl5FEVlJDVEGxCXNwR7LQMLez1LYz0TCwstcMj0LFwCYgwyKloGFIw0zOzcthkcAFsmNEJqCDE0sEIIAEkMXj2IKrkFJRV1BBtTK097fWeLDUdjb1bNPQ6LT0Xx6GwWYxGUw2HQ6eyjEBRCaxaazRILVLpLK0NYbbaXfbFUrlSoNap3eqgR6fHRvD4vb72X42f4IDQaV56Yy+fwvXS+d4jCKI8YxKbxOZJRbLbE5ejrLZ5NCMHFEsoVADKGXI5Dg8DJt1q9wajz8HPoWhMel8GmsTJhrL8YItXnB7y5xmMCKRYriMwS82SmJWOPleKVKpyapJAFEcDgNjcanUHpobRYLVabXbbDpHRoHPQhgKtF9fBCLL5vaLJn60YHpVjVmGtodqMczhddvskxTU08OgYzLzfKZbRZrcZWTZdPZ6HYtDbOrpdNXorXUQGpcHZWt2ydYPQMGhNgwCdgKhIDcnjVTEGY519vnYgWP7C9p6XfPOdKZrOnTC0P94WFH0NwldEgyWJtQyOA8jxPMBDjxLUBE2EReyNSlGieG1p2GDMbAfIEuX8UEvVAmsUQghsd2bOCIEPY9TzEZiwAAYUoTAYEwlMTSaPDXCaICbEMDRjF-SthiBCixnXaj-UlDFoJDOUGMPKQExVCAWB2K4SSvaRDT4u92ltQxOjBMFTBs+xnkdGFjHoT1+neW1uXsHk12RcVFMgxtVL3DsNK0-YWGQrZUPQlBeNvHCbEEto-E9ehTGMRc-C0DkgjCSj5N8+ttxU3d5X3Rj6E0mRtPCyrqpwTjuNJIyb2w6lEs0GFROsMEfF8EwgT8bzfU3JSoJleiysPUooDqPT9gM2LWsQewC3oXpvlsZ5fg6KchKeAshyyuymT6mTcrkny6y3ZTxtgyb6GmuoIs2KKMOvPt+NwjRp18cEQQsF5zEHX92SG8C-No4qJuCh6wBmpQxFqsL6q4nImpAcksP7BLvr2nxdGcgUEqI9kPLBhTCpumC1Pux6EbpjAGrRxbsfap4F3oFa-w0MFLMcKs8sukb-Lou6YfkAAvM9uwvJCWc+l5vy8QGMtMRxbUdD5Oe8Cd0r0GyjHJgrrrG6mgvgyWGEIGQ0AgVUICUBhaEYGQAGsGDAimTYCkr1Lyagpfoa3bZxBBnZkchyjqABtPQAF15dMiS51-dbOr620WT2jlzHnLl-3Irajau0afehi2A6tm27ajFgExwCriBQBVtk943S9FmnxcroPq9D8PI6w2OE-erHPuTzxzBCdOsp0LOksrDR5y0HxrBnDo+osYvhch26u4rqXntemLR5M+K2dtctOY6L4IWsgjt5ooq9-N8rLcR0KdJRxrE-P3G2lBCYZyOtQREXLMnR+ENn5m1Kt3Q+DMmY8VPnFNq-9EC-R8M5Bw5YdAaDHLaRckDKam0CrAg+SFLaIPRpjM+qDWS-U6CCd0eDIT609EQ72ndX5FAdkkfIHsqLtxFlDMWB5f7UlsEvZ4HJrT2CsBORw+YsogkBmlW+f5ZIinyiXYRL8xC8IESSPIgidG7zNuIzQugDBGGCFYTaii8ZAjnGCPBoIeo2j6uEYUGAZA6X1MgExO8kjMFYJwHgfBBDCFEBYhAkJpxwlSjocscjkm-B5FvQWw0n4MCqiwAAihkGQ6AYm2l-C6QIElb7WniXOP8ySpJMkrOWDho1aBIl1AAVWPLwfgaABCEGocZFB940FsiAYBHoPNvA8h5EklpkEGawC6cqCJfSBkxLiXjbQnhSbdXLCvFh8yzGkPyIUegGQMCwAyGhEQFRrjIKWk8Foe0JKiSGDZZoXxdAOBAhdLJUCqYnPQAUQ8VybkoDuSU0w347K9GsgWRcjgLCsgnLSIC2hp56A6OJUwRzoFAvKIUGJANWT9GBOYboaS-xYogZk8GxCy6wXDM7GWJSJLAghBydklgV4wmRdnQE1jAb6A8tCLkeLAW+3DOeGJDhGHDl-KOcck58ygkSdoRkVhFWaLbqY-FUrFSwGVDiEpvRTDzhsrCcwydui+HzOZH4lhxImF+l4CVJCDWt2VJANlQIiyQifDyl8-Kkq2jnEBAUXIea2lxXSr2HcRFqTxLKzywIFXQrHF4FVeMV4GCIj0LKlZpFwndYy-e5U2LnIwCgGQ2pKA+oedjFahgNG9C2nIsw043xrVwZCORCUyWxr+fSzhibuEIVPPQMAmwpDRMbZ9L45qtByM8sYFa2hrD4WbQlEiaiTArVLVwshFbEL0BZVcWVbMYSLjWkEOEfg-w+CHVooW2SPXlxPZOmV87TLgicuyICANYQpOhHavGGi1qIskmrcwHJD1juPUxU954SQxJyp4N0M5W1pTA20N0Uj-CdD3Wu86L7-kMqPX7Nisr9bTnfOa9kQwJw81np4uNQjjm+3ukjL+Vaa11obc1D6v6IRrXfD4DtlZ6OjPEiEIsHxPIEOhDoeDL9EMVU-rpFDFQ0OAWco4MEdkiKlkrLtUNvxnIhDHLoL4IRVMwL9jx3S56ew-vip5IsgHGSFrSo6ZknmHADH0GCdh7G9WSo-SFKqyM5r3KE2PUy3RRIgZtP0Oedl8wWf6HgjdtnSO6qCRF0R5UnM4Bo6YByAxPCAffMMGczSwuFffcVqacNZoXP41QQTGMhmPJnLSXBSS57iU8nYIi04J7fGXa6Hkf4hj2dIX7BmsXUNuceOWc1fKmS8qxWOLk05tDfkhAlXQa7HDNCFMO+NuiHO0za0oM9XYL1raaBJC0-QQtEZxYBH63QQQAeaE6NdNkFtcZhst798XaGIErHm5dXJC3pNHAdm9x3TpndhZdsjI6E1qaW-d7CNDhlPIq3ja0yW5HLvRQWawz6CtvrLeOy2K2dMvYQCZ-1lo5vlgBkBehu39MAyGHPE74rGsM8o-dZn+x1ls7sOlCysLlP+ASvzm0nhhjLocNoYYaVQeRf9oHO2Rr+ndaJ48gsolyffG+ICIY4l6EeMV5IvqEkxz65a4bnJISClFLQCUuwt6fDDCxYuswWh6Gem-DCXBnxwFzw9+W0FPdIc9Zav2b435vigcC+drFuHNDAc5r0fZTIo2hauxx-VBvmd10TGzrnkH8b-k9EBZw2cJwGEtIuXbREfDWkT0znuwca5QEvTJ7wS88Gx96CvOEbrxcAua0nr35XHQr3DXCHGEJwTOsH4hmJvm9pwnNe+RcSSzDciCALSv4Xl9j7Z0yR335oVZTSlil8FfsfXcDEa5gcW09hMcI8FrROZSwp5p8gRhgalzVYR9AgIPR-A5lF9KZZVSc8NY1wggA */
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
          | { type: "fieldInvalid" }
          | { type: "nameChange"; name: string }
          | { type: "providerChange"; provider: CloudProvider }
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
      initial: "verifyAvailability",
      id: "standardPlanMachine",
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
          type: "parallel",
          states: {
            status: {
              initial: "unsubmitted",
              states: {
                unsubmitted: {
                  tags: "unsubmitted",
                },
                submitted: {
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
                  tags: "creatable",
                  on: {
                    fieldInvalid: {
                      target: "invalid",
                    },
                    create: {
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
                  initial: "untouched",
                  states: {
                    untouched: {
                      tags: "nameUntouched",
                    },
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
                      entry: "fieldInvalid",
                      tags: "sizeIdle",
                    },
                    disabled: {
                      entry: "fieldInvalid",
                      tags: "sizeDisabled",
                    },
                    overQuota: {
                      entry: "fieldInvalid",
                      tags: "sizeOverQuota",
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
                    sizeChange: {
                      actions: "setSize",
                      cond: "didSizeChange",
                      target: ".validate",
                    },
                  },
                },
              },
              onDone: {
                target: "#standardPlanMachine.configuring.form.valid",
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
        triggerSave: sendParent((context) => ({
          type: "save",
          data: context.form,
        })),
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
        didProviderChange: (context, event) =>
          context.form.provider !== event.provider,
        didRegionChange: (context, event) =>
          context.form.region !== event.region,
        didSizeChange: (context, event) =>
          context.form.size?.id !== event.size.id,
      },
    }
  );
