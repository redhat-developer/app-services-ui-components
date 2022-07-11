import { assign, createMachine, send, sendParent } from "xstate";
import {
  CloudProvider,
  CreateKafkaInstanceError,
  Region,
  Size,
  StandardPlanInitializationData,
  StandardSizes,
} from "../types";
import { onProviderChange } from "./shared";

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

  // based on the form.provider and form.region selection
  sizes: StandardSizes | undefined;

  creationError: CreateKafkaInstanceError | undefined;
};

export const StandardPlanMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4EMB2E0CcIAUAbTAWTQGMALASwzADoA3MHagMwE8BBRta4gEb9qKDgGJEoAA4B7WCOoyMkkAA9EAJgBsATgAM9AMwAWLQA4ArDsPmA7DoCMAGhAdE++juu2zhh9uMLDUsAXxCXVExsPCJSCho6enIlNmooAFdWDCh6SJR02DFyHDA0FDAVWXkURWUkNUQHPQ0XNwQLMy0jLVt-Bwse4y9bMIj0LFwCYgwyKloGZIxUjKycthkcAFsmNEJqCDFUsEIIAEkMXj2ISrkFJRV1BAcze08zB0Mgq11A21bNPTPehaHoWDo9PQWQy2QyjECRCYxaazBILFJpTK0NYbbaXfZiWDpASbEQ3aq1B6NF46N4fL46H4WP6uTQaQH0YwOYzcrkOPnvOEI6JTOJzRKLZaY7L0dZbXJoRhYoolMpgADK6XI5Dg8HqVTudVAjw0hg0tmBZmMJjBJl6hn+CA0TuM9D0tihWmMGh0ZosDi0gvGwtiM3i8yS6JWWJlOPliuyytK5QAojgcBsyQbKY7TebzFbAlDjHaHRoPmZ6FzOQ4vBorc0RuF4UHJiGUeGJRjVjGtodqMczhddvtMzV7vVHv0tAY-WCOrY9ENOQ7-Q5zRY9IvIX7HDXYU2ha3kWHxZGpWt+ydYPQMGhNgw8dhyhI9bcx4aGghjJZ6LZTJ0TTMXxbG9FctG9TxZzLJp3lsRsxiiI9RVRCMli7aMjivG87zARNVVHCkJ0aU0VxAwxPEBH0dA3TpOgDA8WyRZCOzPbtMIga9b3vMQuLAABhShMBgAjxyNYiWhZJ4tGhTwF3MP1jGaaF4ObRCmNDMU0TQqNpXY68pHTRUIBYHYrlVF9pDfQixPaCCzSGCxv0MPwawkto2TMDQjBNHRLGLTk2QsQM1JFDSUM7HSLwHfTDP2Fg8PKESP0nEjJKdU1fxNJk4LZJ0nWCxFQvbU9tPPGVLw4+gDJkIz4uq2qcAEoSKlfclRM-D43IBV5YJc78uS0NcCuDY9NNQyU2Iq68SigWpTP2cykuzIIHFdOszEcTcYW0LqnhNLomjgv9qMG3NhqQsKWNKybovoGbagSlrLLa5LxJXExyOaBk62-PQTG5c71OKrSJowqa7rAWalDEeq4sawTsiekB9XfbNOpXb0LFdWwtA3GsQPeAGGJCtsTxB9DdPB+7oepjAmsRpaiKeVK2j5L1KwXLKYUUqEVMPIGyfGimoqw+QAC8H2HJ9cMZmyXnIrxoR3RTp3dUsQIMQauU890mj8QGisFiKyr03JqAl+hCBkNAICVCAlAYWhGBkABrBh+cNsbjZu0XzYYK2baxBAnZkcgylqABtPQAF1Zc-BzPAZDbnkO5znDSqwaSaXzc2LRy-wN0mvdYsHbvF-3rdthMWHTHAquIFBZW2D2i-CkvKbLv3LcroOQ7D98o9j1qsyZhOvHMRx3jdNPSzBVap16ZpFMBPnGM9tvrtL32JceuOUt230ugGQJ+gAk0HEL0aN9Bjvt9w2HjPh5q97etKgPIv0uR0IY-xx0JicKq3K6N8RaVXLmIWm9NhLD1RkzdGaVrCrVMKYNc34nQ50vsxEqIDyqdx3uXKBSMUbWQ6izTQOhXicjgoYLwG1PJmEwZdbBwtcFXjEPbRIeR3ZryAcwyKrCOIvyeAFegbJDBfXdFafQxhSzPBdLrLwzwKH6B0Iw4GQtIrsIdrkdA5QdEkyvsA4WQjtAeBMPJawdhHAriAuaT4nxwLzk6AXOEGAZDGV1MgHhhjEjMFYJwHgfBBDCFEEIr0pEDBUI0EyNcnptDPDUYLGqLAACK6QZDoBMbQ384FnLvH9BPFc1EKI+AoZab+gIgKJLGrQBE2oACqt5eD8DQAIQgRCrLtUeOEhBBgaHOlgg2Jk9EEKAJ8QwWmsBGkKiCa09pYTdpNCQVlPOwQggMIASNLB5N+F5AKPQdIGBCTEhEOUa4MCSGTmaA6P0djuZ8kcAyQEQVNkXXUd7aMezrzHJJCgM5JjfD0C+H9ewnorRggdAuGkPhf6fEhNRaE1Tr4sK+UInwDorReWhBQ5oZo1x-X3KMrZTCdkm1jE7KWJihhdFBe8GwFDBoWFLICLynpeiOHAmuXyGyiVvKNu3bEcpHxCKnDOfoYIXiLm-undy-RyJ1n8IuLWlhVGvIFsXTeulYywAVFiExm4KxlnfgauCTIZFpX6KtfQnkTDNCUkTXl6rkX8KbnGSAVKGS-iTh8XQON+iliNa6RywwfospGapMZ2yNFkq2CKj0QLxXzilcuSScqvIblxt+Rw1YNBIqMS68GvF6BgE2FIUJFyumIAJsCHwehfAPMQREisQFomdE+LuT4ea+Em0LThegFKrgirIU8Hwq1LAbiCICTlugu2kp9pVItwqK2vRHS6J0X1KJrlQWYIp7JfCbnrE0PQIJV4GKjR82+C6+2Pnwsu7MJgvI+mpT4X4lomWpoXM2zy4J218k7Wq9e+ae23V4iKutK5HIumotQ+wsE6y5oA7wudW9KoPxMjexKd6maGE6ByKEx6N34Z3Raz4oiQJDB8o4ECp7I0kujfOmKNU4b9qHIOrDNk5U5OXpI7+z6A0eB6BCXFpqEOOsA92hjVVYqP3muc56I8bK6yBfoaSBqNq6B0LI0jZo6w+hoVRs0s76MocYw1MDxHWZeBdDa6czxnIDH-WJpDxnL3TUhnNDDHSXr3p8KIv608p4dG-Oa1mwQaSQnAnWxS2hxGEojcS95AqBFuahhgFjS75OwI40MYENDAT1m-jjECK5l5vHsroF4LxTBGYvaAlLHnKXsc-DCAwNZBMtuQZ0DGG0g2RctM0VTcWW7jJc3ViGqXzMrkhOaWJQRpydETTVpLpty6ydvZly5iAejmndNE2thNhmlheOaIYfIzQ+mnEN7x57lvg1W-seZTXJwDTI2YY9NY63TisEdoIrpNwDGnv6PQqqnMjdq8ls2FtbY6rae6p7mg+SunbYNXydY-zBAdH4dmppl7gTWUBcNw2buarG6t5JOA0kZLQCYxHf1vg1k8v5DHklTTgVEbWblvQFVXbPXR8HK2u4ZeRp0ld0T5UDGiWWP8NZnhHa5AmnGOH6V+tE-FvlGqcEC4tjXDM8OEAggrMeyVgwNo41njWYEvx3Tj0sO6JbJOIerYDlXKAQ6D5QlWr6MsgImgbl8vbzXd2-aTbSgWYEO4fSSsUsWAPLC9JCMtA6XyLpnjBH9Fab9MJY+RSEY5THVgjAqqZO8Xq1EjM6uYHJ4X3mmbBD+uHvTNgzRsq0DY94Rg07UShI4YIPK1dOvmCKizVIwhhCAA */
  createMachine(
    {
      context: {
        capabilities: {} as StandardPlanInitializationData,
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
          | { type: "submit" }
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
          entry: "setInitialContext",
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
          tags: "blocked",
        },
        instanceUnavailable: {
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
                  tags: "creatable",
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
        setCreationError: assign((_context, { error }) => {
          console.log("wtf", error);
          return {
            creationError: error,
          };
        }),
        triggerSave: sendParent((context) => ({
          type: "save",
          data: context.form,
        })),
        triggerSubmit: send("submit"),
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
          return form.size.quota > capabilities.remainingPrepaidQuota; // TODO: marketplaces
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
