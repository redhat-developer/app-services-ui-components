import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SuspendConnection } from "./SuspendConnection";

export default {
  component: SuspendConnection,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SuspendConnection>;

const Template: ComponentStory<typeof SuspendConnection> = (args) => (
  <SuspendConnection {...args} />
);

export const SuspendedConnectionEmptyState = Template.bind({});
