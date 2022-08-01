import { createMachine, assign } from "xstate";
import { ConsumerGroup } from "./types";

export type ConsumerGroupApiResponse = {
  consumers: ConsumerGroup[];
};

export const ConsumerGroupMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2A7WBXAtmATgLRT6pYAOAdAJbrUAu1AhgDYAyqETtUAxAGZh6yABYBlLMmRx4SEOVSwG1DIlAAPRIQCMAJkoBOAwA4DAFgDMu4wFYzANjM2ADPYA0IAJ5abByjfsLA3sAdjNdbQtjbXsDAF84jzRMXAJiUgoaOkZWDi4eASFRADFuFjV5RWVVOU0EQmDKCxsLEOcDAN0zEN1HD296rr9nXRCbXWcrSxaLBKSMbDwiEjIqdFQAESZ6Jl58MH592BEKhSVGGo0tKMpnbWceke1TKLMnfq1tE0pQgPsW3Q2NphWaJEDJRZpFaZAikfB7A5HE5yM7VdAVOo6RyULq+AxfbR2ez2awfeoWdo40w2GzRMIhezabQhObghapZYZKj7JgQTyUABu1DAAHceAACI5YFj0WA0CAsMC8dSwHb0MCUJj8dX4AAULmczgAlLwIRz0qtKDy+YLhWL0FBJXBpbL5YrTlULujaohOpRjCEXoaDJMDBYLGSrH4zCGScZbHpjJNWWalhbMtb+ULRRKpTK5ftDnARAVBMJxJJpLBZKBUV6MYgxiFbndjGZ2uZ7M4Y2TdBF-CFmoDuyYrLoU+y09DuWBeVm7bnnfmrYji6WiiJStRyijPSpvVcEMZAf69B0zITjM07pHiS2DCEvviAeEzBOUlOuSu57acw6ndg+a8BAYCKuqHrnPuDYICSzb2G2dzht00RfGSoT6Pi1ixG8VjaE476QpylqZr+9qOnmsq8NmIoAApMPgXoAPL8PwsBCBBaLQfixiUJYDzdBY8HweMaG6BYPw9LE-w0hETIEea07fja1GLoBlFHEIzGsexu6QZcIB1EydyUCEsYPpMNjaKJ4noVJNLjEy2jyZ+xGzjaIFgRKqYEOKinUAqSrJPw1D4DgHH1j6CCDs2DxGBe4QxP87heIgphmP6lmMt2gRAm+YLeURGZufyHlCF5k4+YppWMA6wGgUIYASFIMjhVBkUWN0vEUiMEymPcUlkkY4nWMyYzGIyQKRAkYLrCBNZsh+UJfrQyi5Jw3AOq1+mYh1+iWH2VhRFEhquGSDTid2QSxJMh0uOO+UVYVaybNsTBbQeBmIFMtzBESgbMrSNhnRMNiUM85ijLoBi9BYzzOUtlqwqg+DvdB4b6NY7TOON2OxJEZ2w6DSbo3cF7CTY8NPUp85-uRS6uv57q6ZxkVAjxAR4YJ+KOHYxi9h1twxoOxK9OMx73fMi1UyRKn-hRBarscPCo6ztJUn1XwhKZbxkpYPEkpE2MuKESF5ZLhHpjOP6y3TanzXWbWHi06XWBrD7a2YZJ4frPWxIG0VdvYlOW9TlDVeVUu+ctAUq07D4mQGhLMjGTjBGS8Y8eGgYuM89whqC5sKV+JHh-+BVR5apdQLHn0IL4zb+0nYTmL4yUDME2hNO0kQOFrXSPsHikl-VNWOuX0413UQLiY3lnN6nbepYSTTEiSoRMhMJiD8XxWkeK5D0V64qoCxbH0JPqWNNzzg53nbxWSlUV6F3Uzo32lhmwtFtD7vGn0Mfp8dK1j3NtRARl7D+jHPceM2Mwh80fo+fQFJX5ji6B1berk5wXwQIdLqho+zY3xK4NOCDQaBHuF0RkXx+JBwelLS22DCCCQgftMSYkrxJkNIvck8YTJhCBHYbseEYjTTiEAA */
  createMachine(
    {
      context: { response: undefined, consumer: undefined },
      tsTypes: {} as import("./ConsumerGroupMachine.typegen").Typegen0,
      schema: {
        context: {} as {
          response: ConsumerGroupApiResponse | undefined;
          consumer: ConsumerGroup | undefined;
        },
        events: {} as
          | {
              type: "fetchSuccess";
              consumers: ConsumerGroup[];
            }
          | { type: "fetchFail" }
          | { type: "refresh" }
          | { type: "selectConsumer"; consumer: ConsumerGroup }
          | { type: "deselectConsumer" },
      },
      id: "consumer-group",
      initial: "initialLodaing",
      states: {
        initialLodaing: {
          invoke: {
            src: "api",
          },
          on: {
            fetchSuccess: [
              {
                cond: "noConsumers",
                target: "noData",
              },
              {
                actions: "setConsumers",
                target: "ready",
              },
            ],
            fetchFail: {
              target: "error",
            },
          },
        },
        noData: {
          on: {
            refresh: {
              target: "initialLodaing",
            },
          },
        },
        error: {
          on: {
            refresh: {
              target: "initialLodaing",
            },
          },
        },
        ready: {
          initial: "viewing results",
          states: {
            "viewing results": {
              initial: "idle",
              states: {
                idle: {
                  after: {
                    "5000": {
                      target: "refreshing",
                    },
                  },
                },
                refreshing: {
                  invoke: {
                    src: "api",
                  },
                  on: {
                    fetchSuccess: {
                      actions: "setConsumers",
                      target: "idle",
                    },
                    fetchFail: {
                      target: "idle",
                    },
                  },
                },
              },
              on: {
                delete: {
                  actions: "setSelectedConsumerGroup",
                  target: "deleting consumer group",
                },
                viewPartionOffset: {
                  target: "view partion offset",
                },
                resetOffset: {
                  target: "reset offset",
                },
              },
            },
            "deleting consumer group": {
              initial: "idle",
              states: {
                idle: {
                  on: {
                    confirm: {
                      target: "deleting",
                    },
                  },
                },
                deleting: {
                  invoke: {
                    src: "deleteConsumerGroup",
                  },
                  on: {
                    deleteSuccess: {
                      target:
                        "#consumer-group.ready.viewing results.refreshing",
                    },
                  },
                },
              },
            },
            "view partion offset": {},
            "reset offset": {},
          },
        },
      },
    },
    {
      actions: {
        setConsumers: assign((_, { consumers }) => ({
          response: {
            consumers,
          },
        })),
      },
      guards: {
        noConsumers: ({ response }) =>
          response === undefined || response.consumers.length === 0,
      },
    }
  );
