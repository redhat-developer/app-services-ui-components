import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { TopicsToolbar } from "./TopicsToolbar";
import TopicsI18n from "./Topics-i18n.json";


export default {
    title: "Empty States/Topics/Topics ToolBar",
    component: TopicsToolbar,
    args: {},
    parameters: {
        i18n: TopicsI18n,
    }
} as ComponentMeta<typeof TopicsToolbar>;

const Template: ComponentStory<typeof TopicsToolbar> = (args) => (
    <TopicsToolbar {...args} />
);

export const Topictoolbar = Template.bind({});
Topictoolbar.args = {};