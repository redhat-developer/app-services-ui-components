import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SettingsAlert } from "./SettingsAlert";

export default {
  component: SettingsAlert,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SettingsAlert>;

const Template: ComponentStory<typeof SettingsAlert> = (args) => (
  <SettingsAlert {...args} />
);

export const Alert = Template.bind({});
