import { createModel } from "xstate/lib/model";
import {
  Provider,
  AZ,
  Providers,
  InstanceAvailability,
  CreateKafkaInstanceError,
  Region,
} from "./types";

export const CreateKafkaInstanceModel = createModel(
  {
    name: undefined as string | undefined,
    provider: undefined as Provider | undefined,
    region: undefined as Region | undefined,
    az: undefined as AZ | undefined,

    defaultProvider: undefined as unknown as Provider,
    defaultRegion: undefined as unknown as Region,
    defaultAZ: undefined as unknown as AZ,
    availableProviders: [] as Providers,
    instanceAvailability: undefined as unknown as InstanceAvailability,

    creationError: undefined as CreateKafkaInstanceError | undefined,
  },
  {
    events: {
      formChange: () => ({}),
      nameChange: (props: { name: string }) => props,
      providerChange: (props: { provider: Provider }) => props,
      regionChange: (props: { region: Region }) => props,
      azChange: (props: { az: AZ }) => props,
      nameIsValid: () => ({}),
      nameIsInvalid: () => ({}),
      nameIsTaken: () => ({}),
      create: () => ({}),
      createSuccess: () => ({}),
      createError: (props: { error: CreateKafkaInstanceError }) => props,
    },
  }
);
