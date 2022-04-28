import { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance } from "../../CreateKafkaInstance";
import {
  argTypes,
  parameters,
  PROVIDERS,
  sampleSubmit,
  Template,
} from "../storiesHelpers";

export default {
  component: CreateKafkaInstance,
  args: {
    apiScenario: "quota",
    apiProviders: PROVIDERS.map((p) => p.id),
    apiDefaultProvider: "aws",
    apiRegionsAvailability: "full",
    apiMaxStreamingUnits: 5,
    apiRemainingStreamingUnits: 3,
    apiLatency: 500,
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateKafkaInstance>;

export const LoadingData = Template.bind({});
LoadingData.storyName = "Loading Data";
LoadingData.args = {
  apiLatency: 999999,
};

export const CreationInProgress = Template.bind({});
CreationInProgress.storyName = "Creation in Progress";
CreationInProgress.args = {
  onCreate: () => {
    // Doing nothing to showcase the loading
  },
};
CreationInProgress.play = sampleSubmit;
