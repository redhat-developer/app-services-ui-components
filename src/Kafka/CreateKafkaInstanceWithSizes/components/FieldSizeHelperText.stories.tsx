import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FieldSizeHelperText as FieldSizeHelperTextComp } from "./FieldSizeHelperText";

export default {
  component: FieldSizeHelperTextComp,
  args: {
    remainingQuota: 4,
    isPreview: false,
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof FieldSizeHelperTextComp>;

const Template: ComponentStory<typeof FieldSizeHelperTextComp> = (args) => (
  <FieldSizeHelperTextComp {...args} />
);

export const StableInstanceType = Template.bind({});

export const TechPreview = Template.bind({});
TechPreview.args = {
  isPreview: true,
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  isUnavailable: true,
};
