import { assign, createMachine, EventFrom, forwardTo, send } from "xstate";
import { CloudProvider, CloudRegion } from "../../types";
import type {
  CloudProviders,
  CreateKafkaFormData,
  CreateKafkaInitializationData,
  CreateKafkaInstanceError,
  StandardPlanInitializationData,
  StandardSizes,
  TrialPlanInitializationData,
  TrialSizes,
} from "../types";
import {
  StandardPlanMachine,
  StandardPlanMachineContext,
} from "./StandardPlanMachine";
import { TrialPlanMachine, TrialPlanMachineContext } from "./TrialPlanMachine";

type Quota =
  | Pick<
      StandardPlanInitializationData,
      | "plan"
      | "remainingPrepaidQuota"
      | "marketplaceSubscriptions"
      | "remainingMarketplaceQuota"
      | "instanceAvailability"
    >
  | Pick<TrialPlanInitializationData, "plan" | "instanceAvailability">;

export type CreateKafkaInstanceMachineContext = {
  quota: Quota | undefined;
  providers: CloudProviders | undefined;
  defaultProvider: CloudProvider | undefined;
  capabilities: CreateKafkaInitializationData | undefined;
};

const CreateKafkaInstanceMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMBOYCGAXMBpDAZgNYYCSAdrFhucmAHQA2A9hhAJblT0COArs2r1kACzDIinKAAIqNCBlQRp-QRgDEYVKmap6AB0bYCugLbD02PIRIU5tBizZTeAoaPGSus6uQVKVNwwETgA3ZmRsdmZyAG0ABgBdRFB9Zlh2LGjyFJAAD0QAFniAJnp4gGYAdkKATgAOeqr4qvrCgFYAGhAAT0QANir++n769tqq2sKARhKKjsKAX0XutEwcfGIySl86JlYOLlc1YTEJKR95RWVVanV7fxug6QxQjHYjACNGMFy0jKyMVyBQQxTKlRqDSaLTaXV6iHG8XoVXahX6UyqJVqJX6-WWq0sGxs23seych24twwp08Fwe10CanUzD4WGkzAIlz8DKpf3SmWywKKpXK1TqjWarQ63T6CHa8UK9Hqcw6JUK6palXxIDWVk2th2NDJBxcVJp5289ICVPU5GYXMejOoLzeHww31+SBA-wFQK9ILBoshEph0vhoPaw2hFRKasKbQa0yWKx1hOsWzsu0cJqOZqtEHUfIBgv9iCTU2RkZj03RYsjMoGyvo0yG40KJSq0wq02m9W1uqJGcNDn2zlzQXoEDAoTALH0WkLXp9gJypYQ5cVKP61drNXr4faFSRJVmdUmasjvf7af1JKzo4px3cZy8MinM7nWhd7y+H0yPU0bRdAMIwsBMVBzAHdMDVJbMx0pCcPAtN9p1nZh51Qb83U+P8sB6EJyHCSIVwSZIl35FchQQWpanaeh4y7JN5gqbFZgbOU1WRE96m3Bp+lRKoKmvdZoLvI04MfM0kNfaR3zQjCsN-Rh-3UOTP0wvhYEgItfVXUAQRouiGO7QpmNYkp2NMqolXqWZcSPCpRn6NFhL1YlM3Eh9TUQl8LjU9Cv1eH93VwgD-IUoLsJ+HTKLXQz6NskyzJPCzwwqdppnoWj4niaZ2kPepaiTaZXMHGD73JFwCDALBRAufQdFCdgp1QWB1Aa5gmpa2AXj8aR0CgbIesir5ovI4s-X0staNqegjzGcZ+hKHjeyqdj2jGcplu4moFSqKpStEjyR0qo5qtqkR6sa5qtDarQdD0QxjDMCwRNvY7jXg+hzrq7wOq626CKIqIYlImKSym9cMRsiY0RmaYFXiOFZUKfa5rqRy5mmWp4kGdpDve4dPsfH7Lr+67uvainbvZTCBqG6Q+HIEb3TG1IKIh-Jpsjeh2k7XHOw7QqWnY0Z6mbapakGNVqgR-GUygwnYK8rhVJiBg5BwV63KHZXTqgcHJq5hASlROj+lKCp6kqdUVvYq3Mr3ds0UaPLZgJ9yiY13xHSe8h6Gan57leT12YmvTjaxbd6NM+NDIVdLCkskUFmxyZt2cwYPd1+982kP36FgV4pHUKCAGU+GQOhYHgcbdKoxOjKR0p6nmYXlvt1Fyn6Lt1W7E9Jkc7Pys8vOC6LprVaggBRIDUENiOQSjioY7b+PTNRe2a152NbLy03M7y4exJHcKvwLwOwGDmcF6orFWl5i2Nt7toEYqUWpayrt5SW+z4ls4+H0GBn0wuPYuU80wVyrnAWuYd65rkbvRBUtQ6x9zaKLeMO8WhDB7PEKEtRAFe0nKhdS+cjD+wniXGec9b5rnvuLSMSNErxhmJUUWCMsrKmWngsEuJ5YpjtFOWBqY3qez1jmBCJxpJ0h9jyIItDIYI1SrKSM4tW6dmVB0TsaISoKxvGIiqEinzUnzAo42zRxYojmD3FEtk+bTFFkMZskYcS9mfiwwh4ivpmhAWYkEswGg2RwSxJosxSjrU4tjAePcEY8SKp4wx3ifK0m8CAxSIVlJ4T8QMfic1lrFVaMqeYDjwztjojxHhsYOxW1ssmAkoic6eX1sY7JCBWjsQ7LNKWjRKiLRxmieW9SdYjxOkY0mV1Oo3Vaq0msCoY7FCGOlWMsxkYIkxMiHh7RYyMPjEJPRDSRnExcJYCAso4GxUhrGQY5QMpjCSpedaExkRND5jorEFQ9lDLKifI5XBWmb3DC2TKlRGLVCxBeDoCTR49CoGAUwjNmaulGqHb0HMjYgkciiLK+UUFWRxt2VZbT1mt1GK0Fo-EOx4n2cMn53srgBAvhANmqLw53yaIqfi4xsQdnyu2d+aVqjONbmna2OJuxQpHGPchhdwEGzrhc42MZBXYwmD3CE-F+j21jCMZy8Ytxdlom0CVewpU0FacteUIwcXcpRKiOY7FsYrzBdbeMhUWJt2NcAkhAVQHSsvuaxos19rzUxelFsyiBjdhGC2UYLY4k9l0V8o6RC0lgMnnK85nMMVVPKJo2GbiirsOsrMd1uU1SWzqSImlQDiEfh9WQs18qs2IGWrk4N-9Q0ZUxJZJoSolWVBylYwqnrhDMFMIYGqKLlzNoQNUf+SomFoP2p2Ht1lcZ5Roj2IW4rqXfKAa0o87EaI3JyhtQS2Ntyo2WMsIAA */
  createMachine(
    {
      context: {
        providers: undefined,
        defaultProvider: undefined,
        quota: undefined,
        capabilities: undefined,
      },
      tsTypes: {} as import("./CreateKafkaInstanceMachine.typegen").Typegen0,
      schema: {
        context: {} as CreateKafkaInstanceMachineContext,
        events: {} as
          | {
              type: "standard quota available";
              quota: Pick<
                StandardPlanInitializationData,
                | "remainingPrepaidQuota"
                | "remainingMarketplaceQuota"
                | "marketplaceSubscriptions"
              >;
            }
          | {
              type: "out of standard quota";
              quota: Pick<
                StandardPlanInitializationData,
                "marketplaceSubscriptions"
              >;
            }
          | {
              type: "no standard quota available";
              hasTrialQuota: boolean;
            }
          | {
              type: "trial available";
              capabilities: TrialPlanInitializationData;
            }
          | { type: "trial used" }
          | { type: "developer available" }
          | { type: "developer used" }
          | { type: "developer unavailable" }
          | {
              type: "providers and regions available";
              providers: CloudProviders;
              defaultProvider: CloudProvider | undefined;
            }
          | { type: "providers or regions unavailable" }
          | { type: "save"; data: CreateKafkaFormData }
          | { type: "createSuccess" }
          | { type: "createError"; error: CreateKafkaInstanceError },
        services: {} as {
          checkStandardQuota: {
            data: never;
          };
          checkDeveloperAvailability: {
            data: never;
          };
          fetchProvidersWithRegions: {
            data: never;
          };
          standardPlan: {
            data: StandardPlanMachineContext;
          };
          trialPlan: {
            data: TrialPlanMachineContext;
          };
        },
      },
      id: "createKafkaInstance",
      initial: "loading",
      states: {
        loading: {
          description: "Fetch the data required to drive the creation flow",
          tags: "loading",
          initial: "quota",
          states: {
            quota: {
              initial: "checking standard quota",
              states: {
                "checking standard quota": {
                  invoke: {
                    src: "checkStandardQuota",
                    onError: [
                      {
                        actions: "setStandardUnavailable",
                        target: "standard",
                      },
                    ],
                  },
                  on: {
                    "standard quota available": {
                      actions: "setStandardAvailable",
                      target: "standard",
                    },
                    "out of standard quota": {
                      actions: "setStandardOutOfQuota",
                      target: "standard",
                    },
                    "no standard quota available": {
                      target: "checking developer availability",
                    },
                  },
                },
                standard: {
                  type: "final",
                  always: {
                    target: "#createKafkaInstance.loading.fetching providers",
                  },
                },
                developer: {
                  type: "final",
                  always: {
                    target: "#createKafkaInstance.loading.fetching providers",
                  },
                },
                "checking developer availability": {
                  invoke: {
                    src: "checkDeveloperAvailability",
                    onError: [
                      {
                        actions: "setDeveloperUnavailable",
                        target: "developer",
                      },
                    ],
                  },
                  on: {
                    "developer used": {
                      actions: "setDeveloperUsed",
                      target: "developer",
                    },
                    "developer available": {
                      actions: "setDeveloperAvailable",
                      target: "developer",
                    },
                    "developer unavailable": {
                      actions: "setDeveloperUnavailable",
                      target: "developer",
                    },
                  },
                },
              },
            },
            "fetching providers": {
              invoke: {
                src: "fetchProvidersWithRegions",
                onError: [
                  {
                    actions: "setProvidersOrRegionsUnavailable",
                    target: "ready",
                  },
                ],
              },
              on: {
                "providers and regions available": {
                  actions: "setProviders",
                  target: "ready",
                },
                "providers or regions unavailable": {
                  actions: "setProvidersOrRegionsUnavailable",
                  target: "ready",
                },
              },
            },
            ready: {
              type: "final",
              entry: "setCapabilities",
            },
          },
          onDone: [
            {
              cond: "standard plan",
              target: "standard plan",
            },
            {
              cond: "developer plan",
              target: "developer plan",
            },
            {
              target: "system unavailable",
            },
          ],
        },
        "system unavailable": {
          tags: "systemUnavailable",
          type: "final",
        },
        "standard plan": {
          invoke: {
            src: "standardPlan",
            id: "standardPlanService",
          },
          tags: "standardPlan",
          initial: "idle",
          states: {
            idle: {
              on: {
                save: {
                  target: "saving",
                },
              },
            },
            saving: {
              invoke: {
                src: "createInstance",
              },
              tags: "saving",
              on: {
                createSuccess: {
                  target: "#createKafkaInstance.complete",
                },
                createError: {
                  actions: "notifyCreateErrorToStandardPlan",
                  target: "idle",
                },
              },
            },
          },
        },
        "developer plan": {
          invoke: {
            src: "trialPlan",
            id: "trialPlanService",
          },
          tags: "trialPlan",
          initial: "idle",
          states: {
            idle: {
              on: {
                save: {
                  target: "saving",
                },
              },
            },
            saving: {
              invoke: {
                src: "createInstance",
              },
              tags: "saving",
              on: {
                createSuccess: {
                  target: "#createKafkaInstance.complete",
                },
                createError: {
                  actions: "notifyCreateErrorToTrialPlan",
                  target: "idle",
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
        /* eslint-disable @typescript-eslint/no-unused-vars */
        setDeveloperAvailable: assign((_) => ({
          quota: {
            plan: "developer" as const,
            instanceAvailability: "available" as const,
          },
        })),
        setDeveloperUnavailable: assign((_) => ({
          quota: {
            plan: "developer" as const,
            instanceAvailability: "unavailable" as const,
          },
        })),
        setDeveloperUsed: assign((_) => ({
          quota: {
            plan: "developer" as const,
            instanceAvailability: "used" as const,
          },
        })),
        setStandardAvailable: assign((_, event) => ({
          quota: {
            plan: "standard" as const,
            instanceAvailability: "available" as const,
            remainingPrepaidQuota: event.quota.remainingPrepaidQuota,
            marketplaceSubscriptions: event.quota.marketplaceSubscriptions,
            remainingMarketplaceQuota: event.quota.remainingMarketplaceQuota,
          },
        })),
        setStandardOutOfQuota: assign((_, event) => ({
          quota: {
            plan: "standard" as const,
            instanceAvailability: "out-of-quota" as const,
            marketplaceSubscriptions: event.quota.marketplaceSubscriptions,
            remainingMarketplaceQuota: 0,
            remainingPrepaidQuota: 0,
          },
        })),
        setStandardUnavailable: assign((_) => ({
          quota: {
            plan: "standard" as const,
            instanceAvailability: "instance-unavailable" as const,
            marketplaceSubscriptions: [],
            remainingMarketplaceQuota: 0,
            remainingPrepaidQuota: 0,
          },
        })),
        setProviders: assign((_, event) => {
          return {
            providers: event.providers,
            defaultProvider: event.defaultProvider,
          };
        }),
        setProvidersOrRegionsUnavailable: assign((context) => {
          const quota = context.quota!;
          if (quota.plan === "standard") {
            quota.instanceAvailability = "regions-unavailable";
          } else {
            quota.instanceAvailability = "unavailable";
          }
          return {
            providers: [],
            quota,
          };
        }),
        setCapabilities: assign((context) => {
          const { providers, defaultProvider, quota } = context;
          if (!providers || !quota) {
            throw new Error("unexpected condition, no providers or quota");
          }
          if (quota.plan === "standard") {
            const capabilities: StandardPlanInitializationData = {
              plan: "standard",
              availableProviders: providers,
              defaultProvider,
              instanceAvailability: quota.instanceAvailability,
              marketplaceSubscriptions: quota.marketplaceSubscriptions,
              remainingMarketplaceQuota: quota.remainingMarketplaceQuota,
              remainingPrepaidQuota: quota.remainingPrepaidQuota,
            };
            return { capabilities };
          } else {
            const capabilities: TrialPlanInitializationData = {
              plan: "developer",
              availableProviders: providers,
              defaultProvider,
              instanceAvailability: quota.instanceAvailability,
            };
            return { capabilities };
          }
        }),
        notifyCreateErrorToStandardPlan: forwardTo("standardPlanService"),
        notifyCreateErrorToTrialPlan: send(
          (_, event) => {
            return { type: "createError", error: event.error };
          },
          { to: "trialPlanService" }
        ),
        /* eslint-enable @typescript-eslint/no-unused-vars */
      },
      guards: {
        "standard plan": (context) => context.quota?.plan === "standard",
        "developer plan": (context) => context.quota?.plan === "developer",
      },
    }
  );

type EventTypes = Pick<
  EventFrom<typeof CreateKafkaInstanceMachine>,
  "type"
>["type"];

type EventOptions<E extends EventTypes> = Omit<
  EventFrom<typeof CreateKafkaInstanceMachine, E>,
  "type"
>;

export type CreateKafkaInstanceServices = {
  checkStandardQuota: (events: {
    onOutOfQuota: (p: EventOptions<"out of standard quota">) => void;
    onQuotaAvailable: (p: EventOptions<"standard quota available">) => void;
    onNoQuotaAvailable: (
      p: EventOptions<"no standard quota available">
    ) => void;
  }) => void;
  checkDeveloperAvailability: (events: {
    onUsed: () => void;
    onAvailable: () => void;
    onUnavailable: () => void;
  }) => void;
  fetchProvidersWithRegions: (
    plan: "standard" | "developer",
    events: {
      onAvailable: (p: EventOptions<"providers and regions available">) => void;
      onUnavailable: () => void;
    }
  ) => void;
  getStandardSizes: (
    provider: CloudProvider,
    region: CloudRegion
  ) => Promise<StandardSizes>;
  getTrialSizes: (
    provider: CloudProvider,
    region: CloudRegion
  ) => Promise<TrialSizes>;
  onCreate: (
    data: CreateKafkaFormData,
    onSuccess: () => void,
    onError: (error: CreateKafkaInstanceError) => void
  ) => void;
  children?: React.ReactNode;
};

export function makeCreateKafkaInstanceMachine({
  checkStandardQuota: checkStandardQuotaCb,
  checkDeveloperAvailability: checkDeveloperAvailabilityCb,
  fetchProvidersWithRegions: fetchProvidersWithRegionsCb,
  getStandardSizes: getStandardSizesCb,
  getTrialSizes: getTrialSizesCb,
  onCreate,
}: CreateKafkaInstanceServices) {
  return CreateKafkaInstanceMachine.withConfig({
    services: {
      checkStandardQuota: () => {
        return (send) =>
          checkStandardQuotaCb({
            onNoQuotaAvailable: ({ hasTrialQuota }) => {
              send({ type: "no standard quota available", hasTrialQuota });
            },
            onOutOfQuota: ({ quota }) => {
              send({ type: "out of standard quota", quota });
            },
            onQuotaAvailable: ({ quota }) => {
              send({ type: "standard quota available", quota });
            },
          });
      },
      checkDeveloperAvailability: () => {
        return (send) => {
          checkDeveloperAvailabilityCb({
            onAvailable: () => send("developer available"),
            onUsed: () => send("developer used"),
            onUnavailable: () => send("developer unavailable"),
          });
        };
      },
      fetchProvidersWithRegions: (context) => {
        const instanceType = context.quota!.plan;
        return (send) => {
          fetchProvidersWithRegionsCb(instanceType, {
            onAvailable: ({ providers, defaultProvider }) =>
              send({
                type: "providers and regions available",
                providers,
                defaultProvider,
              }),
            onUnavailable: () => send("providers or regions unavailable"),
          });
        };
      },
      createInstance: (_context, event) => {
        const form = event.data;

        return (send) => {
          function onSuccess() {
            send("createSuccess");
          }
          function onError(error: CreateKafkaInstanceError) {
            send({ type: "createError", error });
          }
          onCreate(
            {
              plan: form.plan,
              name: form.name,
              provider: form.provider,
              region: form.region,
              sizeId: form.sizeId,
              billing: form.billing,
            },
            onSuccess,
            onError
          );
        };
      },
      standardPlan: (context) => {
        return StandardPlanMachine.withContext({
          capabilities: context.capabilities as StandardPlanInitializationData,
          sizes: undefined,
          form: {},
          creationError: undefined,
        }).withConfig({
          services: {
            getSizes: (context) => {
              const form = context.form as Required<typeof context.form>;
              return getStandardSizesCb(form.provider, form.region);
            },
          },
        });
      },
      trialPlan: (context) => {
        return TrialPlanMachine.withContext({
          capabilities: context.capabilities as TrialPlanInitializationData,
          sizes: undefined,
          form: {},
          creationError: undefined,
        }).withConfig({
          services: {
            getSizes: (context) => {
              const form = context.form as Required<typeof context.form>;
              return getTrialSizesCb(form.provider, form.region);
            },
          },
        });
      },
    },
  });
}
