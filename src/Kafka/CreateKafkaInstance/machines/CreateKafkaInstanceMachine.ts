import { assign, createMachine } from "xstate";
import { send } from "xstate/lib/actions";
import type {
  CreateKafkaFormData,
  CreateKafkaInitializationData,
  CreateKafkaInstanceError,
  CreateKafkaInstanceServices,
  StandardPlanInitializationData,
  TrialPlanInitializationData,
} from "../types";
import { StandardPlanMachine } from "./StandardPlanMachine";
import { TrialPlanMachine } from "./TrialPlanMachine";

export const LOADING = "loading";
export const SYSTEM_UNAVAILABLE = "systemUnavailable";
export const STANDARD_PLAN = "standardPlan";
export const TRIAL_PLAN = "trialPlan";
export const STANDARD_PLAN_MACHINE_ID = "standardPlanService";
export const TRIAL_PLAN_MACHINE_ID = "trialPlanService";
export const SAVING = "SAVING";

export type CreateKafkaInstanceMachineContext = {
  // initial data coming from the APIs
  capabilities: CreateKafkaInitializationData | undefined;
};

const CreateKafkaInstanceMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMBOYCGAXMBpDAZgNYYCSAdrFhucmAHQA2A9hhAJblQDEEz5DTgDdmRBmkw58xMpWq0GLNpygJhzZNnb8A2gAYAuolAAHZrHZZt5YyAAeiACwA2AOz1negKyOAHF4BGPV89AE4AJkdXABoQAE9EAFpw13cw10jPN38fAF9c2IlsPEISCioaOiZWDi5uMFRUZlR6E0ZsAmaAW3oiqVLZCoVq5S41chFNK11DWzMLaZskeydXZ3oA8IDXMN9U0K8AZgCvWISERMPAj19Q1z97lP3XfML0YukyuUqGIYgMVAQAAK7XI9HYEEYYG4sAwQjAc3MlmstgcCDujnoXm8kQiO2czl8ATOiHCh18WNcB3JkV8zhSbleID6JRk5XkVT+AOBoPosKEKm4LIAygBXZB0WDwZbzZH8VGIIJ6PT0RzK7xeXxavQBQ6hEkIRx3LEBNWHDLOGn3Jksz6DDm-eT-QEgmh8uGClkAUUazURCxRyzRASC4Q2O184WcpscAVCekcBtN62cmsOx1ChwJBNCjht736bO+wywqHYGEYrrBEKhMLhCJlSMWCsNBPoCZSJ01yoOBrJKeC4XCXlSW1NoXzklZXyGVVL5crvP5noLYDFErg0tMTcDoDRRsO9CpdMJ4VuXiO+viTmNgTVzlCAUtEUtLwKzNXdvZP3o84rVfdAU6m9X1UH9OUlj3RBPACehwkfTVwl2XxHEOJNsXoPY4x2Vws2HXx03yd9yGYCA4FsW0Bm-YYlFqKBwObIMkkOMMngIlINSpRxE2vC4s1g6McjVMkfCjQ5Jw+Kji05OIqDALoAFVyDhDB2HaAAjKEGN3FYED2FUR2HUJQmce89EtA1Lk1OC9CuIJYyHIcvGcCTCxnB0+SdbkAJrBttwDeUmPRC9VU7cyXG4o0ePOE5Qg2Q5HEQjJ4zCXNXOne0fy5F0lw9LhtMCqDgq8ULXBOONQn8fxosQFjMT1WMWOHbEErzd9KKLWdHRoZ0eRoArIN0zNYMcMLTNM7jcz7MMMkS1wfATEz4z2dKv2khg-0XN1fIGltEpVB9bgzbwoiTS16ASyMOLWSKR1WqSut-Mt-1yoD6MbALBv3PxMOHB9XEjTwTpiXiWJVAIQkCHtbgyAj7s6jzNqrXagtGzFI2cu5AeVHwQfOKN6EzSNTSQxLPD8eH3J-ZBmC6NowBwFGivmkqAa8KM7lTTVMwNTwSt1JD4wS+MogndrPweh0md0xJnLg1J2J2C8uJqi5UMxbnIbJMSTKI3IgA */
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
            data: any;
          };
          trialPlan: {
            data: any;
          };
        },
      },
      id: "createKafkaInstance",
      initial: "loading",
      states: {
        loading: {
          tags: LOADING,
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
        },
        systemUnavailable: {
          tags: SYSTEM_UNAVAILABLE,
          type: "final",
        },
        standardPlan: {
          tags: STANDARD_PLAN,
          invoke: {
            src: "standardPlan",
            id: STANDARD_PLAN_MACHINE_ID,
          },
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
          tags: TRIAL_PLAN,
          invoke: {
            src: "trialPlan",
            id: TRIAL_PLAN_MACHINE_ID,
          },
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
              tags: SAVING,
              invoke: {
                src: "createInstance",
              },
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
        notifyCreateErrorToStandardPlan: (_, event) =>
          send(
            { type: "createError", error: event.error },
            { to: STANDARD_PLAN_MACHINE_ID }
          ),
        notifyCreateErrorToTrialPlan: (_, event) =>
          send(
            { type: "createError", error: event.error },
            { to: TRIAL_PLAN_MACHINE_ID }
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
      getAvailableProvidersAndDefaults,
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
          selectedProvider: undefined,
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
          selectedProvider: undefined,
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
