import { assign, createMachine, forwardTo, send } from "xstate";
import type {
  CreateKafkaFormData,
  CreateKafkaInitializationData,
  CreateKafkaInstanceError,
  CreateKafkaInstanceServices,
  StandardPlanInitializationData,
  TrialPlanInitializationData,
} from "../types";
import {
  StandardPlanMachine,
  StandardPlanMachineContext,
} from "./StandardPlanMachine";
import { TrialPlanMachine, TrialPlanMachineContext } from "./TrialPlanMachine";

export type CreateKafkaInstanceMachineContext = {
  // initial data coming from the APIs
  capabilities: CreateKafkaInitializationData | undefined;
};

const CreateKafkaInstanceMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMBOYCGAXMBpDAZgNYYCSAdrFhucmAHQA2A9hhAJblQDEEz5DTgDdmRBmkw58xMpWq0GLNpygJhzZNnb8A2gAYAuolAAHZrHZZt5YyAAeiACwA2AOz1negKyOAHF4BGPV89AE4AJkdXABoQAE9EAFpw13cw10jPN38fAF9c2IlsPEISCioaOiZWDi5uMFRUZlR6E0ZsAmaAW3oiqVLZCoVq5S41chFNK11DWzMLaZskeydXZ3oA8IDXMN9U0K8AZgCvWISERMPAj19Q1z97lP3XfML0YukyuUqGIYgMVAQAAK7XI9HYEEYYG4sAwQjAc3MlmstgcCDujnoXm8kQiO2czl8ATOiHCh18WNcB3JkV8zhSbleID6JRk5XkVT+AOBoPosKEKm4LIAygBXZB0WDwZbzZH8VGIIJ6PT0RzK7xeXxavQBQ6hEkIRx3LEBNWHDLOGn3Jksz6DDm-eT-QEgmh8uGClkAUUazURCxRyzRASC4Q2O184WcpscAVCekcBtN62cmsOx1ChwJBNCjht736bO+wywqHYGEYrrBEKhMLhCJlSMWCsNBPoCZSJ01yoOBrJKeC4XCXlSW1NoXzklZXyGVVL5crvP5noLYDFErg0tMTcDoDRRsO9CpdMJ4VuXiO+viTmNgTVzlCAUtEUtLwKzNXdvZP3o84rVfdAU6m9X1UH9OUlj3RBPACehwkfTVwl2XxHEOJNsXoPY4x2Vws2HXx03yd9yGYCA4FsW0Bm-YYlFqKBwObIMknWE49FTY5WKJNZUwNS54PbeNQlzLZ-CfSJJw+Kji05OIqDALoAFVyDhDB2HaAAjKEGN3FYED2FUR2HITnHvNi0OvC4rgpJCriCWMhyHLxnAkwsZwdPknW5ACawbbcA3lJj0QvVVOzYlxHAi3N0NCDZDkcRCMnjMJcxc6d7R-LkXSXD0uG0gKoKCrwQtcE441Cfx-ETCzDkieg9VjGrh2xOK83fSii1nR0aGdHkaDyyDdMzWDHFCkyTMiqrziHG4astLxQgfHZ71Sr9pIYP9FzdHz+pbeKVQfW4M28KIk0tOq-CHHDxvit83inVbOt-Mt-2yoD6MbfyBv3PxMOHRbI08Y6YmqpCNhCQIe1uDICJWqTHo2qsdsCkbMUjJy7gB5UfGBqb1luRaMUiYJ7mctrPzh9zkGYLo2jAHAkYK1xgtcfwozuVNNUzA1PCK3UkPjOL4yiCcyfuimfgZ3TLhVVj2JDbEuIJXjUNg7Ch2VGCkOtIigA */
  createMachine(
    {
      context: { capabilities: undefined },
      tsTypes: {} as import("./CreateKafkaInstanceMachine.typegen").Typegen0,
      schema: {
        context: {} as CreateKafkaInstanceMachineContext,
        events: {} as
          | { type: "save"; data: CreateKafkaFormData }
          | { type: "createSuccess" }
          | { type: "createError"; error: CreateKafkaInstanceError },
        services: {} as {
          getAvailableProvidersAndDefaults: {
            data: CreateKafkaInitializationData;
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
          invoke: {
            src: "getAvailableProvidersAndDefaults",
            onDone: [
              {
                actions: "setAvailableProvidersAndDefault",
                cond: "canCreateStandardInstances",
                target: "standardPlan",
              },
              {
                actions: "setAvailableProvidersAndDefault",
                cond: "canCreateTrialInstances",
                target: "trialPlan",
              },
            ],
            onError: [
              {
                target: "systemUnavailable",
              },
            ],
          },
          tags: "loading",
        },
        systemUnavailable: {
          tags: "systemUnavailable",
          type: "final",
        },
        standardPlan: {
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
        trialPlan: {
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
        setAvailableProvidersAndDefault: assign((_context, event) => {
          const capabilities = event.data;

          return {
            capabilities,
          };
        }),
        notifyCreateErrorToStandardPlan: forwardTo("standardPlanService"),
        notifyCreateErrorToTrialPlan: send(
          (_, event) => {
            console.log("wtf????", event);
            return { type: "createError", error: event.error };
          },
          { to: "trialPlanService" }
        ),
      },
      guards: {
        canCreateStandardInstances: (_, { data: capabilities }) =>
          capabilities !== undefined && capabilities.plan === "standard",
        canCreateTrialInstances: (_, { data: capabilities }) =>
          capabilities !== undefined && capabilities.plan === "trial",
      },
    }
  );

export function makeCreateKafkaInstanceMachine({
  getAvailableProvidersAndDefaults,
  getStandardSizes: getStandardSizesCb,
  getTrialSizes: getTrialSizesCb,
  onCreate,
}: CreateKafkaInstanceServices) {
  return CreateKafkaInstanceMachine.withConfig({
    services: {
      getAvailableProvidersAndDefaults:
        async (): Promise<CreateKafkaInitializationData> => {
          const capabilities = await getAvailableProvidersAndDefaults();
          // For extra safety, let's check we actually got regions and that some of them are available.
          // Ideally this check should be done by the backend, who should be then passing the "regions-unavailable" availability.
          const allRegions = capabilities.availableProviders.flatMap(
            (p) => p.regions
          );
          const noRegions =
            allRegions.length === 0 ||
            allRegions.every((r) => r.isDisabled === true);
          if (noRegions) {
            capabilities.instanceAvailability =
              capabilities.plan === "standard"
                ? "regions-unavailable"
                : "unavailable";
          }
          return capabilities;
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
              name: form.name,
              provider: form.provider,
              region: form.region,
              sizeId: form.sizeId,
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
