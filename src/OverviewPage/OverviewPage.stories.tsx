import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { OverviewPage } from './OverviewPage'

export default {
    title: "Features/OverviewPage",
    component: OverviewPage,
    args: {},
} as ComponentMeta<typeof OverviewPage>;

const Template: ComponentStory<typeof OverviewPage> = (args) => (
    <OverviewPage {...args} />
);

export const Overview = Template.bind({});