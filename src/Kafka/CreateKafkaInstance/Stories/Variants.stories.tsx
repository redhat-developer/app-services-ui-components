import type { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance } from "../CreateKafkaInstance";
import {
  argTypes,
  defaultStoryArgs,
  parameters,
  Template,
} from "./storiesHelpers";

export default {
  component: CreateKafkaInstance,
  args: defaultStoryArgs,
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
