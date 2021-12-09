import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { TopicEmptyState } from "./TopicEmptyState";
import TopicsI18n from "./Topics-i18n.json";


export default {
    title: "Empty States/Topics/No Topics",
    component: TopicEmptyState,
    args: {},
    parameters: {
        i18n: TopicsI18n,
    }
} as ComponentMeta<typeof TopicEmptyState>;

const Template: ComponentStory<typeof TopicEmptyState> = (args) => (
    <TopicEmptyState {...args} />
);

export const EmptyTopic = Template.bind({});
EmptyTopic.args = {};
