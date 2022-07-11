import type { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance as CreateKafkaInstanceComponent } from "./CreateKafkaInstance";
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
    apiStandardScenario: "available",
    apiTrialScenario: "available",
    apiProviders: PROVIDERS.map((p) => p.id),
    apiDefaultProvider: "aws",
    apiRegionsAvailability: "full",
    apiRemainingQuota: 3,
    apiLatency: 500,
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateKafkaInstanceComponent>;

export const CreateKafkaInstance = Template.bind({});
