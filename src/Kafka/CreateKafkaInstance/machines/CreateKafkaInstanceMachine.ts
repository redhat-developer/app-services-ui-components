import { assign, createMachine } from "xstate";
import { send } from "xstate/lib/actions";
import type {
  CreateKafkaFormData,
  CreateKafkaInitializationData,
  CreateKafkaInstanceError,
  MakeCreateKafkaInstanceMachine,
  StandardPlanInitializationData,
  TrialPlanInitializationData,
} from "../types";
import { StandardPlanMachine } from "./StandardPlanMachine";
import { TrialPlanMachine } from "./TrialPlanMachine";

export const SYSTEM_UNAVAILABLE = "systemUnavailable";

export type CreateKafkaInstanceMachineContext = {
  // initial data coming from the APIs
  capabilities: CreateKafkaInitializationData | undefined;
};

const CreateKafkaInstanceMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMBOYCGAXMBpDAZgNYYCSAdrFhucmAHQA2A9hhAJblQDEEz5DTgDdmRBmkw58xMpWq0GLNpygJhzZNnb8A2gAYAuolAAHZrHZZt5YyAAeiAKwBmABz0AbABYAjM496AEwA7ME+XgA0IACeiD4egfQ+wR5+Cc6+qf4AvtlREth4hCQUVDR0TKwcXNxgqKjMqPQmjNgEjQC29AVSxbJlCpXKXGrkIppWuoa2ZhaTNkj2cXpe9EGOPpsezkGhrq5RsQg7PvRersGBAJw+etvbgR65+eiF0iVy5QwDEBioEAAFVrkejsCCMMDcWAYIRgGbmSzWWwOBC3VL0NyuLxeK6uQLhDxXRyHRBXYL0LHBLzpPTBRxBPQ+Z4gHpFGSleQVH5-QHA+jQoQqbisgDKAFdkHRYPBFrNEfxkXFHF5nJ49K5nJdwqFqZEYohAs5VR4Uj5DRdDc5DcFmaz3v1Od95L9-kCaPyYULWQBReqNeFzJGLFGbMlrRz7W7q3HBMkkhCOM7rW43Xx6RkhW2vXrsz6DLCodgYRhukFgiFQmFw2UI+aK1F6RxXNZeYKuRzeZL7K3xxzBPRJC6tvGBR7XJ55FnZtkfAYVAtFkt8gVe6fiyVwGWmWtB0AhxyG8PJPzJI1G+Mm8lGwI4umXbyuLOSGcOr70BfF0sewU1H1+1ABvKCx7nEPhXIk-YdoyrZeIEBz6gg5yquBVIah4LjJBsE6TuQzAQHAth2n0HJvko1RQIBdbBogGpJMEzjKq4VxGpcrh3PGAC0PguPQRK0l2lxwZqT5vMReZctEVBgB0ACq5Awhg7CtAARhClG7ksqJNp49GOBGGTOCeCTxs4uL0FB5opAkgQrCJOazo6-LOjyX7ltW26Bgq1ENrBGK3Ds-bcYE9LwUcPjuF46x3G2bZYo8zh2S+JGDNyrrLp6XDqV5IE+Ykhl6AxwU4m4wTxuFxoJI22x+Fc6p0ol9rJVyzlpTQWXAZptzhX5BW0oyB4hZxmzuH2N61eqtIpLGDViXODAfku7pue19a3Cq9D9pFlxUlaEaBPGOIeLxIStkSjxEuBjgzbmc3voWn7pT+FE1p5HUhgVzZXISdKphGjIXl4ibXhseKav41LXQ5b4LaWK3eV1iZfWSTbhH9ehXCZ2lnTijKXEaoOQ6+gzIMwHQtGAOBwzlySjrxDFMQVbjUh4JndckqQHjccX+Dak5ETdjpU5p2mnoxzGanB7EIRxo5HVc2K6gVoTo1cuS5EAA */
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
          tags: "systemUnavailable",
          type: "final",
        },
        standardPlan: {
          invoke: {
            src: "standardPlan",
            id: "standardPlan",
          },
          initial: "init",
          states: {
            init: {
              entry: "initStandarPlan",
              always: "idle",
            },
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
            id: "trialPlan",
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
        initStandarPlan: (context) =>
          send(
            { type: "init", capabilities: context.capabilities },
            { to: "standarPlan" }
          ),
        notifyCreateErrorToStandardPlan: (_, event) =>
          send(
            { type: "createError", error: event.error },
            { to: "standardPlan" }
          ),
        notifyCreateErrorToTrialPlan: (_, event) =>
          send(
            { type: "createError", error: event.error },
            { to: "trialPlan" }
          ),
      },
      guards: {
        canCreateStandardInstances: ({ capabilities }) =>
          capabilities !== undefined && capabilities.plan === "standard",
        canCreateTrialInstances: ({ capabilities }) =>
          capabilities !== undefined && capabilities.plan === "trial",
      },
    }
  );

export function makeCreateKafkaInstanceMachine({
  getAvailableProvidersAndDefaults,
  getStandardSizes: getStandardSizesCb,
  getTrialSizes: getTrialSizesCb,
  onCreate,
}: MakeCreateKafkaInstanceMachine) {
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
