import { ComponentMeta } from "@storybook/react";
import {
  CreateKafkaInstance,
  CreateKafkaInstanceProps,
} from "../../CreateKafkaInstance";
import {
  makeAvailableProvidersAndDefaults,
  sampleSubmit,
  Template,
} from "../storiesHelpers";

export default {
  component: CreateKafkaInstance,
  args: {
    getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
      instanceAvailability: "quota",
      defaultAZ: "multi",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
    }),
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
} as ComponentMeta<typeof CreateKafkaInstance>;

export const LoadingData = Template.bind({});
LoadingData.storyName = "Loading Data";
LoadingData.args = {
  getAvailableProvidersAndDefaults: async () => {
    return new Promise(() => {
      // never resolve to simulate loading
    });
  },
} as CreateKafkaInstanceProps;

export const CreationInProgress = Template.bind({});
CreationInProgress.storyName = "Creation in Progress";
CreationInProgress.args = {
  onCreate: () => {
    // Doing nothing to showcase the loading
  },
};
CreationInProgress.play = sampleSubmit;
