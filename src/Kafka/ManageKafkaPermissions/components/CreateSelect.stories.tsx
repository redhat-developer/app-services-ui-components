import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateSelect } from "./CreateSelect";

export default {
  component: CreateSelect,
  args: {
    options: [
      {
        value: "value",
        title: "title",
        description: "description",
        disabled: false,
      },
      {
        value: "value2",
        title: "title2",
        description: "description4",
        disabled: false,
      },
      {
        value: "value3",
        title: "title3",
        description: "description5",
        disabled: false,
      },
    ],
    selected: { value: "" },
    row: 1,
    value: "permission_type",
    placeholder: "Select value",
    setEscapeClosesModal: (value: boolean) => value,
    setSelected: (row: number, _id: string | undefined, _childRow?: number) =>
      row,
  },
} as unknown as ComponentMeta<typeof CreateSelect>;

const Template: ComponentStory<typeof CreateSelect> = (args) => (
  <CreateSelect {...args} />
);

export const EmptyState = Template.bind({});
EmptyState.args = {};
