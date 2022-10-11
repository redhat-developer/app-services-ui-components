import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SuspendedConnection } from "./SuspendedConnection";

export default {
  component: SuspendedConnection,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SuspendedConnection>;

const Template: ComponentStory<typeof SuspendedConnection> = (args) => (
  <SuspendedConnection {...args} />
);

export const SuspendedConnectionEmptyState = Template.bind({});
