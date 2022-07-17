import { assign, createMachine, send, sendParent } from "xstate";
import {
  CloudProvider,
  CreateKafkaInstanceError,
  MarketPlace,
  Region,
  Size,
  StandardPlanInitializationData,
  StandardSizes,
} from "../types";
import { onProviderChange } from "./shared";

export type SelectedSubscription = {
  marketplace: MarketPlace;
  subscription: string;
};

export type StandardPlanMachineContext = {
  // initial data coming from the APIs
  capabilities: StandardPlanInitializationData;

  // what the user is selecting
  form: {
    name?: string;
    provider?: CloudProvider;
    region?: Region;
    size?: Size;
    billing?: SelectedSubscription | "prepaid";
  };

  // based on the form.provider selection

  // based on the form.provider and form.region selection
  sizes: StandardSizes | undefined;

  creationError: CreateKafkaInstanceError | undefined;
};

export const StandardPlanMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4EMB2E0CcIAUAbTAWTQGMALASwzADoA3MHagMwE8BBRta4gEb9qKDgGJEoAA4B7WCOoyMkkAA9EAZgAcARnoBOfQAYdOrQHYArABYNAJnMAaEB0Q6j++reuXL5k3bWWpY65gC+Yc6omNh4RKQUNHT05Eps1FAArqwYUPTRKJmwYuQ4YGgoYCqy8iiKykhqmjp29OYW5hpGQYG+zq4Ilvoa9KZGlh4a5joAbPqBEVHoWLgExBhkVLQMqRjpWTl5bDI4ALZMaITUEGLpYIQQAJIYvFcQ1XIKSirqCKGG9Ds+ksU1m5n0M2s1n0-UQdgmllGdjsOj8QJm7ihixA0RWcXWmySOzSGWytCOJ3Or2uYlgmQEpxEH1q9R+bmMnnMnRR9n8di0RjssIQ-MFo2sgQ81lCGjm2NxsTWCS2yV2+zJuXoxzO+TQjHJJTKFTAAGVMuRyHB4I0al8GqBfoEZlp6FpISYdBp7PprFZhaK9JDAuDproQfLlor4htEtsUiSDuStZTdfrcobypUAKI4HAnZl2tkinn0WVTFFQrS+mb+jEzehzMz84btazjCMxVbRwlxtWkw7Js63aj3J4vS7XAt1b6NR0+etaWXzPmQmsuOGmRGWfmWRchbctGYdvFKmMq4l7ftJu4PWD0DBoU4ManYSoSG2faf2poIIL15GmDo+iLkBdhGOYa4DLMUKjKCljOkYbrDFox5RgSsaqgmGpHCOt73o+YAZsaU6srObj2F45gSn4UIaDY7QaMKMouohVgzNuHhgRoOioV26HnvGl6JpqN4QHeD5PmIElgAAwpQmAwCRM4OuRrS+tRVG2PRi5MexrSojM9iIW2VgSrx+LKkSgnqgOol3lIeb6hALAXG8xrvtIn6kSpgxAm00IosiEEzDMTjriKHj1hMEIoqE1iGeYdjmaePaYUJ2FarhYn0A5MhOSwRGVEp36-J6alUfCml0b6Onhci8UGJxnoSuBGj6Ml3YYReNnXll9mOdcBW5flOByQpVQfiyyk-mVlEabR2mMXVUr0EYgo+qGQHtJYHX8VZfbCTho53mUUD1K51zucVRYHl4hg6EEPisdYTHwkYgLDNKRjsSF0I7ZEOKRnxlm9lhtl9fQp31IVE2eVNJWqXNlULTVS1QXR5iAqidgzCYApui0u0g2lPUiRDUNKGIw2DaN8m5LDIC2l+RazepyNaajTFdJ4OM8hBnRejxAMKsDZ77WDvXHZDYBnZTFMYGN9PXWRfwUWzNEcwxTEGaWvgWA9Gg+P41hE2LoPpeDUvyAAXs+E6voRys+b6gbcW7czQu4tUDA44KrZCsogfyXqm6l3VXmTVvULb9CEDIaAQAaEBKAwtCMDIADWDAixZZskxHR14TbDBxwn5IIGnMjkBU9QANpGAAuk7P6gvQNi6HY2gPVCwr2HRbS6PoVG7lYQyh111kF5lUcx6XifpiweY4DlxAoNq5w5ylE8HRldn5NHJfx-PUAVy8Vc10o9dN5NhYq9uLqBMiwEWBKneWL3vKrSEiHDOBILDOPASO9LZFwPjDZujpQq6wAuxYwoEpj+n-qMT0254KG3ig9QB4sLaS1AbbKmA1nK03GhAtwi4sYeisPMQw9hay4wML6RKhhvrgiFksTsucw6T0OtPPBhF5aK0UjfZmKtcYuh9GBQwGIUS1kNgYT6Ewfqd26Fg82pNC7ZWLrSA+giGZM28j+KiLopjbkhPrcCuhaweGgT4Ux-hZj-XYSeTqQCJaRz4WIIQhAri5F0aQ388E26NnYuCZcEEXp1VxpjAmVYqKsOBEeYWQNOHbzcRou8XifF5BfFdYRBjfi7kDD6WU7FFwCm6L3LQAJpgtFRGCMySSOFb1cTg9x2VMlJiUIQDgZoBCwFKNQKQX5iiwHuGAcgKBen9NYEMgx+jpqlQempNqMwcaCiohjXuxh6yIUNkPZqpjElOLQsTcOPC94dM1A5MAUg+AQC4FgKZAzZlKBGWMiZTyZkiLhrfHyD1xhtwguMbQHtDLv3CrYQyDY1pgXGPoVEFhVH53ORDS5eRrm3OuA8iAnzBnDNpO8lA+AyiYveHkhZbhQiY18P83cbpvqhGFN4EYLRuhem+qCJFZzd6ov4FkgheUaZ+PJQjVW9ZuKojifYZEQJe67kRO0RciEcbxUQo4wGTSXHYPUbwsSYhk7JAKNnZJzTtVTzsv42YALphrRBIlVZhtwU+zBf5II246K7hVVy7h2F9Up3yOgSoAbNV7TUQXfx-IcaumlMbX0JgpH+hKUiMClUQiYgiADDAMhnLWmQCarVcZmCsE4DwPgghhCiH8SEaNoU2qyglD6cYworAGG9CER1PpqLeryiwAAipkGQ6B-EChGJxaEPgtC+y0K9VohsqxrTMI26YRyNXONDckWguJLQAFUHy8H4GgAQhA9FeQpQgLk71OiduCFyaRTq4RGBGG6RKoEWi6DWiuzeBbkjy1gLuvUZbD3Hv8Vyawd0tC6AlBB50sq6pVlLAHcYyJFzDFmN64BSYChFHoJkDAdIGQiEqGSn53yZqIVLG1KsIQUTFJsMKIYPM4pUQNpO306G0nBsKHefDjIUBEf8fOAwZhpT4y5KPCJAxl2rS6IueEnd4TwXY60vIWHc2M1PaK+DXpgI+FqbRiTiAJgulMKFeYht-C+AAY0tdpyfW2RTGne2lrwRgc9PCkwoVQiTsTSiVazDuhckDhCJTOr14XWI+p+GLNwTGfAhiH+7gHr3pFLjEYoU1rBCCMMOYGgQvmpTLAPU5II0oIbBYDw4x5wojCj7Kw+lZScV8PCT0eXzkFb1JACNCUDDhJc8CYI-pwSIlWbFHGHtMHWZOXnbl9mzjOf8LBdzYIvNCmWl0Nu5n5juBqfYVrPKpbSXoGAU4QyBgkfyYgJhox3VtjQTVad4VQid39pO5EcLDJ7ZAdlQ7jm3iWrVhVDW1UtaPfBDstszouRgi9CbSbosuEYbaeJAi4XnNgY9vRMFOMQRMXhTsgy7QbW7kNp93B32Uc5KKiKoshsRhtXmHJqpXpO5MUSqOmDb2hgfbhyklpoWIbSUteR9WVVFpMUs+KOiD0wQcVh8c+HqTlO6v6oKoh4XiLU5ViCgwDhuKBZMm6SCG5oReEKaKKRVT1VfvXTNsnKuRr0F+5OTXfybCAm0CqwwQIh7JeUWBt0nc6LzEnZD0nSOcqEJci+ED25-ZBAsCCZrXJ-QPU8BOt9HgISW7D+kiPquWBC5dCLlGIOfZrU8OXo2MrISGBz8r6WssMDq6p+ds9UwXShQFi0GwZUavkUfYCETUJ3DcXiihHnpqw0oqlvLR344-su5mhMZBvJQggkFLYpi0pESzDKTjCDbUJvy952a6feFZ-R8X78To71POClWc6ICkIuYD8CMJr6o-nR173vLQvSMgdi6PbgR6CyhgTlIqrTBJQT7fq27h7FzN4npRZa7tANidAmbDyhTIi1jTANiBCvYhTNi5bQE252Z277wxzXDAZX6IwgiGzAFuztDwiDYQjSZQiijp6fr5okGI657wGJyFZHqdbUEIAdBeC6DcRVhejiGrY+zAh6DAgmCKJWDaA+Df4QzwEADufAdQuQAAYicP2oOmgP9q0LQVMLyJAQlB-NWuMF7L-MoVZsfpPsivtnwvQD2jgIYUOsIbNLQSZJ6J6Iwcll0APgzsqkEBYuPk4TAaQXAQfKjsIfCpyB5shuxN6DIZoIhCAZIdtJ5tCOEMQbZjwfXvAYvPmD4RRGYdyFDjjAguFG2qtG2GVMCgzmoTPIfGXLkCBlCoZMEPyAKFCEMAZggNxMMG0IlNuCGIuF-oUdNrEbwQfH-lURYYeHUT7D4K5ltIbMiIZBiAUdEdwRxhcnykmJTogb8jNNoI1J0IZI+n4HAsEeIa6mBO4EMJ3GwqulNgjkcbyt4kmFmiaISvUAAEpgAACOmQ1AZQEW8yoqOsHqfcLmoU0IWy1aFgnajaAowmbReEaK7hGA3SuKLyeGc+l+recJHobQdqVK9OVYD2Aw2gAIaCsKIKaIOJ7SJxmoXSPS9I0yeK9Qd4ZJkWFxpUbqDYbB8KLQb2GIWyIUyCT23EFY2g7JGSnJeQ3JRJwy-iwEmMyh0wgWhgdJvcbEbcnazWNg8KboKp9AeJGKdy2KmpApR2J2laPhAQBgB4qI0o0o7Ewxtgso0Ka0fIhgEIqhsx3xSuxxfxVyJK9pjyvJzywy+QCZXycyGm0Wz2bU4E8IIUZUvoTK-ppYk6VYOmPgIc4Ziu-OUstpsZWK8ZfSiZTpdpzu5JLMno70EwQIiEzouMf0BZQwq0JgbOVYvZ7YFZfO5qvxWSEeNycZOKKZ-Jry2pEGHpsUPePpdGEKT24pDKfRkItg1paKlqLQpYm4UqMqQIOgcqa0bQPoIQzo8E0URBBxRRPxx0w6YGxems3siAhpCG0xyhl5wW45p+2E-i9C2mVGemHMTK-cLQ9gEO0iGWcunxCuAkhWzAMJ6ZKsQIboppkqnQ-haMcIQe0KT2xgj6D0VpIF2wEa0S8UV69aQIt2GRIoraxg7Q3Q8UoZUwGaYQQAA */
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
          | { type: "selectSubscription"; subscription: SelectedSubscription }
          | { type: "selectPrepaid" }
          | { type: "billingChange" }
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
                          cond: "noProviderOrRegion",
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
                          cond: "billingRequiredButNotSelected",
                          target: "waitingForQuota",
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
                    waitingForQuota: {
                      entry: "fieldInvalid",
                      tags: "sizeWaitingForQuota",
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
                    billingChange: {
                      target: ".validate",
                    },
                  },
                },
                billing: {
                  initial: "validate",
                  states: {
                    validate: {
                      always: [
                        {
                          actions: "setBillingToPrepaid",
                          cond: "onlyPrepaid",
                          target: "noSelectionRequired",
                        },
                        {
                          cond: "singleSubscription",
                          target: "noSelectionRequired",
                        },
                        {
                          cond: "onlySubscriptions",
                          target: "onlySubscriptions",
                        },
                        {
                          description:
                            "user has both prepaid and marketplace subscriptions",
                          target: "prepaidAndSubscriptions",
                        },
                      ],
                    },
                    noSelectionRequired: {
                      description:
                        "The user doesn't need to specify any option about the billing. The API will automatically figure out the right thing to do without giving it any information.",
                      tags: ["noBilling", "billingValid"],
                      type: "final",
                    },
                    onlySubscriptions: {
                      description:
                        "More than one subscription exist. The user needs to select one to procede.",
                      initial: "invalid",
                      type: "final",
                      states: {
                        invalid: {},
                        valid: {
                          entry: "triggerBillingChange",
                          tags: "billingValid",
                          type: "final",
                        },
                      },
                      on: {
                        selectSubscription: [
                          {
                            actions: "setBillingToSubscription",
                            cond: "matchesSelectedProviderOrRHMarketplace",
                            target: ".valid",
                          },
                          {
                            cond: "noSelectedProvider",
                            target: ".valid",
                          },
                        ],
                      },
                    },
                    prepaidAndSubscriptions: {
                      description:
                        "The user has both prepaid quota and one or more subscription to a marketplace. The user needs to select one to procede.",
                      initial: "empty",
                      type: "final",
                      states: {
                        empty: {},
                        subscription: {
                          entry: "triggerBillingChange",
                          tags: "billingValid",
                          type: "final",
                        },
                        prepaid: {
                          entry: "triggerBillingChange",
                          tags: "billingValid",
                          type: "final",
                        },
                      },
                      on: {
                        selectSubscription: [
                          {
                            actions: "setBillingToSubscription",
                            cond: "matchesSelectedProviderOrRHMarketplace",
                            target: ".subscription",
                          },
                          {
                            cond: "noSelectedProvider",
                            target: ".subscription",
                          },
                        ],
                        selectPrepaid: {
                          actions: "setBillingToPrepaid",
                          target: ".prepaid",
                        },
                      },
                    },
                  },
                  on: {
                    providerChange: {
                      actions: "unsetSubscription",
                      description:
                        "If a new provider is selected, deselect any previously selected billing option.",
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
        triggerBillingChange: send("billingChange"),
        setBillingToPrepaid: assign((context) => {
          const form = { ...context.form };
          form.billing = "prepaid";
          return { form };
        }),
        setBillingToSubscription: assign((context, event) => {
          const form = { ...context.form };
          form.billing = event.subscription;
          return { form };
        }),
        unsetSubscription: assign((context) => {
          const form = { ...context.form };
          form.billing = undefined;
          return { form };
        }),
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
        noProviderOrRegion: ({ form }) =>
          form.provider === undefined || form.region === undefined,
        noSizes: ({ sizes }) => sizes === undefined,
        emptySizes: ({ sizes }) => sizes !== undefined && sizes.length === 0,
        sizeIsDisabled: ({ form, capabilities }) => {
          if (capabilities === undefined) return true;
          return form.size?.isDisabled === true;
        },
        billingRequiredButNotSelected: ({ form }, _, meta) => {
          if (meta.state.hasTag("noBilling")) {
            return false;
          }
          return form.billing === undefined;
        },
        sizeIsOverQuota: ({ form, capabilities }) => {
          if (capabilities === undefined || !form.size) return true;
          const availableQuota =
            form.billing === "prepaid"
              ? capabilities.remainingPrepaidQuota
              : capabilities.remainingMarketplaceQuota;
          if (!availableQuota) return true;
          return form.size.quota > availableQuota;
        },
        didProviderChange: (context, event) =>
          context.form.provider !== event.provider,
        didRegionChange: (context, event) =>
          context.form.region !== event.region,
        didSizeChange: (context, event) =>
          context.form.size?.id !== event.size.id,
        onlyPrepaid: (context) =>
          context.capabilities.marketplacesQuota.length === 0,
        singleSubscription: (context) =>
          context.capabilities.remainingPrepaidQuota === undefined &&
          context.capabilities.marketplacesQuota.flatMap((m) => m.subscriptions)
            .length === 1,
        onlySubscriptions: (context) =>
          context.capabilities.remainingPrepaidQuota === undefined &&
          context.capabilities.marketplacesQuota.length > 0,
        matchesSelectedProviderOrRHMarketplace: ({ form }, { subscription }) =>
          subscription.marketplace === "rh" ||
          form.provider === subscription.marketplace,
        noSelectedProvider: ({ form }) => form.provider === undefined,
      },
    }
  );
