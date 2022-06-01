import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { FieldSizeHelperTextOverQuota as FieldSizeHelperTextOverQuotaComp } from "./FieldSizeHelperTextOverQuota";

export default {
  component: FieldSizeHelperTextOverQuotaComp,
  args: {
    remainingQuota: 4,
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof FieldSizeHelperTextOverQuotaComp>;

const Template: ComponentStory<typeof FieldSizeHelperTextOverQuotaComp> = (
  args
) => <FieldSizeHelperTextOverQuotaComp {...args} />;

export const FieldSizeHelperTextOverQuota = Template.bind({});
