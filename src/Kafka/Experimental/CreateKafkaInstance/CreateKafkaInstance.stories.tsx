import { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance as CreateKafkaInstanceComponent } from "./CreateKafkaInstance";
import { argTypes, PROVIDERS, Template } from "./Stories/storiesHelpers";

export default {
  component: CreateKafkaInstanceComponent,
  args: {
    apiScenario: "quota",
    apiProviders: PROVIDERS.map((p) => p.id),
    apiDefaultProvider: "aws",
    apiRegionsAvailability: "full",
    apiMaxStreamingUnits: 5,
    apiRemainingStreamingUnits: 3,
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
  argTypes,
  parameters: {
    controls: { include: /^api/ },
  },
} as ComponentMeta<typeof CreateKafkaInstanceComponent>;

export const CreateKafkaInstance = Template.bind({});
