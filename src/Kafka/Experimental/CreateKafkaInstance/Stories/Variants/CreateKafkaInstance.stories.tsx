import { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance } from "../../CreateKafkaInstance";
import { argTypes, parameters, PROVIDERS, Template } from "../storiesHelpers";

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
