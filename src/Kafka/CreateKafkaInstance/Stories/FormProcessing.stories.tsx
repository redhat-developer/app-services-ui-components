import type { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance } from "../CreateKafkaInstance";
import {
  argTypes,
  defaultStoryArgs,
  parameters,
  sampleSubmit,
  Template,
} from "./storiesHelpers";

export default {
  component: CreateKafkaInstance,
  args: defaultStoryArgs,
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateKafkaInstance>;

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
