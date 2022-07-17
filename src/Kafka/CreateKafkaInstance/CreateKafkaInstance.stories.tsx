import type { ComponentMeta } from "@storybook/react";
import { CreateKafkaInstance as CreateKafkaInstanceComponent } from "./CreateKafkaInstance";
import {
  argTypes,
  defaultStoryArgs,
  parameters,
  Template,
} from "./Stories/storiesHelpers";

export default {
  component: CreateKafkaInstanceComponent,
  args: defaultStoryArgs,
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateKafkaInstanceComponent>;

export const CreateKafkaInstance = Template.bind({});
