import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SuspendPopover } from "./SuspendPopover";
import { Button, ButtonVariant } from "@patternfly/react-core";

export default {
  component: SuspendPopover,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SuspendPopover>;

const Template: ComponentStory<typeof SuspendPopover> = (
  args,
  { viewMode }
) => {
  const inDocs = viewMode === "docs";
  return (
    <div
      style={{ textAlign: "center", paddingTop: inDocs ? 0 : 250 }}
      {...args}
    >
      <SuspendPopover>
        <Button variant={ButtonVariant.link}>{"Suspended"}</Button>
      </SuspendPopover>
    </div>
  );
};

export const Popover = Template.bind({});
