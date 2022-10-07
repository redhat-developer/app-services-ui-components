import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SuspendedPopover } from "./SuspendedPopover";
import { Button, ButtonVariant } from "@patternfly/react-core";

export default {
  component: SuspendedPopover,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SuspendedPopover>;

const Template: ComponentStory<typeof SuspendedPopover> = (
  args,
  { viewMode }
) => {
  const inDocs = viewMode === "docs";
  return (
    <div
      style={{ textAlign: "center", paddingTop: inDocs ? 0 : 250 }}
      {...args}
    >
      <SuspendedPopover>
        <Button variant={ButtonVariant.link}>{"Suspended"}</Button>
      </SuspendedPopover>
    </div>
  );
};

export const Popover = Template.bind({});
