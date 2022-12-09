import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SuspendedPopoverWithLink } from "./SuspendedPopoverWithLink";
import { Button, ButtonVariant } from "@patternfly/react-core";

export default {
  component: SuspendedPopoverWithLink,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SuspendedPopoverWithLink>;

const Template: ComponentStory<typeof SuspendedPopoverWithLink> = (
  args,
  { viewMode }
) => {
  const inDocs = viewMode === "docs";
  return (
    <div
      style={{ textAlign: "center", paddingTop: inDocs ? 0 : 250 }}
      {...args}
    >
      <SuspendedPopoverWithLink>
        <Button variant={ButtonVariant.link}>{"Suspended"}</Button>
      </SuspendedPopoverWithLink>
    </div>
  );
};

export const Popover = Template.bind({});
