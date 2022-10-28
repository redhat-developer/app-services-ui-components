import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SuspendedPopover1 } from "./SuspendedPopover1";
import { Button, ButtonVariant } from "@patternfly/react-core";

export default {
  component: SuspendedPopover1,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SuspendedPopover1>;

const Template: ComponentStory<typeof SuspendedPopover1> = (
  args,
  { viewMode }
) => {
  const inDocs = viewMode === "docs";
  return (
    <div
      style={{ textAlign: "center", paddingTop: inDocs ? 0 : 250 }}
      {...args}
    >
      <SuspendedPopover1>
        <Button variant={ButtonVariant.link}>{"Suspended"}</Button>
      </SuspendedPopover1>
    </div>
  );
};

export const Popover = Template.bind({});
