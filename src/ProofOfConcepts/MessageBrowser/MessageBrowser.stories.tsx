import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MessageBrowser } from "./MessageBrowser";

export default {
  component: MessageBrowser,
  args: {},
  parameters: {},
} as ComponentMeta<typeof MessageBrowser>;

const Template: ComponentStory<typeof MessageBrowser> = (
  args,
  { parameters }
) => <MessageBrowser {...args} />;

export const Demo = Template.bind({});
