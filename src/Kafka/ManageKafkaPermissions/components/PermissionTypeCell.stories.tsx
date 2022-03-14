import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PermissionTypeCell } from "./PermissionTypeCell";
import { AclShortcutType, NewAcls } from "../types";

export default {
  component: PermissionTypeCell,
  args: {
    acl: {
      permission: { value: "ALLOW" },
      operation: { value: "ALL" },
      resourceType: { value: "GROUP" },
      patternType: { value: "LITERAL" },
      resource: { value: "RESOURCE" },
      AclShortcutType: { value: AclShortcutType.ConsumeTopic },
    },
    row: 1,
    childRow: 0,
    setEscapeClosesModal: (value: boolean) => value,
    onChangeAcls: (value: NewAcls[] | []) => value,
  },
} as unknown as ComponentMeta<typeof PermissionTypeCell>;

const Template: ComponentStory<typeof PermissionTypeCell> = (args) => (
  <PermissionTypeCell {...args} />
);

export const EmptyState = Template.bind({});
EmptyState.args = {};
