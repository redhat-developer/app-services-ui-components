import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FieldSizeHelperTextTrial as FieldSizeHelperTextTrialComp } from "./FieldSizeHelperTextTrial";

export default {
  component: FieldSizeHelperTextTrialComp,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof FieldSizeHelperTextTrialComp>;

const Template: ComponentStory<typeof FieldSizeHelperTextTrialComp> = (
  args
) => <FieldSizeHelperTextTrialComp {...args} />;

export const FieldSizeHelperTextTrial = Template.bind({});
