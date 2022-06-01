import type { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstanceWithSizes as CreateKafkaInstanceComponent } from "./CreateKafkaInstanceWithSizes";
import {
  argTypes,
  parameters,
  PROVIDERS,
  Template,
} from "./Stories/storiesHelpers";

export default {
  component: CreateKafkaInstanceComponent,
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
} as ComponentMeta<typeof CreateKafkaInstanceComponent>;

export const CreateKafkaInstanceWithSizes = Template.bind({});
