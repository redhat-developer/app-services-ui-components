import type { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstanceWithSizes } from "../CreateKafkaInstanceWithSizes";
import { argTypes, parameters, PROVIDERS, Template } from "./storiesHelpers";

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

export const VariantCanCustomizeDefaultProvider = Template.bind({});
VariantCanCustomizeDefaultProvider.storyName = "Custom Default Provider";
VariantCanCustomizeDefaultProvider.args = {
  apiDefaultProvider: "azure",
};

export const VariantSingleProvider = Template.bind({});
VariantSingleProvider.storyName = "Single provider";
VariantSingleProvider.args = {
  apiProviders: ["aws"],
};

export const VariantNoDefaultsRequired = Template.bind({});
VariantNoDefaultsRequired.storyName = "No Defaults";
VariantNoDefaultsRequired.args = {
  apiDefaultProvider: undefined,
};
