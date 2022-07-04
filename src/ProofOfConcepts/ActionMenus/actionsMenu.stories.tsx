import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { AllActionsDropdown } from "./allActions";
import { InstanceTable } from "./kafkaInstanceKebabMenu";
import { InstanceDropdown } from "./kafkaInstanceDropdownMenu";
import { TopicKebab } from "./kafkaTopicKebabMenu";
import { TopicActions } from "./kafkaTopicDropdownMenu";

export default {
  component: AllActionsDropdown,
  args: {},
} as ComponentMeta<typeof AllActionsDropdown>;

const Template3: ComponentStory<typeof AllActionsDropdown> = (args) => (
  <div style={{ paddingTop: 25, paddingLeft: 25, height: 600 }}>
    <AllActionsDropdown {...args} />
  </div>
);
export const AllInstanceActions = Template3.bind({});
AllInstanceActions.args = {};

const Template2: ComponentStory<typeof InstanceTable> = (args) => (
  <div style={{ paddingTop: 25, paddingLeft: 25, height: 400 }}>
    <InstanceTable {...args} />
  </div>
);
export const KafkaInstanceKebabMenu = Template2.bind({});
KafkaInstanceKebabMenu.args = {};

const Template: ComponentStory<typeof InstanceDropdown> = (args) => (
  <div style={{ paddingTop: 25, paddingLeft: 25, height: 400 }}>
    <InstanceDropdown {...args} />
  </div>
);
export const KafkaInstanceDropdownMenu = Template.bind({});
KafkaInstanceDropdownMenu.args = {};

const Template5: ComponentStory<typeof TopicKebab> = (args) => (
  <div style={{ paddingTop: 25, paddingLeft: 25, height: 600 }}>
    <TopicKebab {...args} />
  </div>
);
export const KafkaTopicKebabMenu = Template5.bind({});
KafkaTopicKebabMenu.args = {};

const Template4: ComponentStory<typeof TopicActions> = (args) => (
  <div style={{ paddingTop: 25, paddingLeft: 25, height: 600 }}>
    <TopicActions {...args} />
  </div>
);
export const KafkaTopicDropdownMenu = Template4.bind({});
KafkaTopicDropdownMenu.args = {};
