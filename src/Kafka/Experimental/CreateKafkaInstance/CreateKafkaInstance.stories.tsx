import { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance as CreateKafkaInstanceComponent } from "./CreateKafkaInstance";
import {
  makeAvailableProvidersAndDefaults,
  Template,
} from "./Stories/storiesHelpers";

export default {
  component: CreateKafkaInstanceComponent,
  args: {
    getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
      instanceAvailability: "quota",
      defaultAZ: "multi",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
      allowedStreamingUnits: 2,
      remainingStreamingUnits: 1,
    }),
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
} as ComponentMeta<typeof CreateKafkaInstanceComponent>;

export const CreateKafkaInstance = Template.bind({});
CreateKafkaInstance.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: "aws",
    providers: ["aws"],
    instanceAvailability: "quota",
    defaultAZ: "multi",
    defaultRegion: "eu-west-1",
    allowedStreamingUnits: 2,
    remainingStreamingUnits: 2,
  }),
};
