import type { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstanceWithSizes } from "../CreateKafkaInstanceWithSizes";
import {
  argTypes,
  parameters,
  PROVIDERS,
  sampleSubmit,
  Template,
} from "./storiesHelpers";

export default {
  component: CreateKafkaInstanceWithSizes,
  args: {
    apiPlan: "standard",
    apiScenario: "standard-available",
    apiProviders: PROVIDERS.map((p) => p.id),
    apiDefaultProvider: "aws",
    apiRegionsAvailability: "full",
    apiMaxStreamingUnits: 5,
    apiRemainingQuota: 3,
    apiLatency: 500,
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateKafkaInstanceWithSizes>;

export const LoadingData = Template.bind({});
LoadingData.args = {
  apiLatency: 999999,
};

export const CreationInProgress = Template.bind({});
CreationInProgress.args = {
  onCreate: () => {
    // Doing nothing to showcase the loading
  },
};
CreationInProgress.play = sampleSubmit;
