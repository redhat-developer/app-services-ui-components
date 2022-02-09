import { ComponentStory, ComponentMeta } from "@storybook/react";
import { subHours } from "date-fns";
import React from "react";
import { DetailsTab } from "./DetailsTab";

export default {
  component: DetailsTab,
  args: {
    id: "c7tkgchgb2d04561srg",
    owner: "snaithan_kafka_devexp",
    region: "US East, N. Virginia",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
} as ComponentMeta<typeof DetailsTab>;

const Template: ComponentStory<typeof DetailsTab> = (args) => (
  <DetailsTab {...args} />
);

export const JustCreated = Template.bind({});
JustCreated.args = {};

export const CreatedSomeTimeAgo = Template.bind({});
CreatedSomeTimeAgo.args = {
  createdAt: subHours(new Date(), 25),
};

export const CreatedLongTimeAgo = Template.bind({});
CreatedLongTimeAgo.args = {
  createdAt: subHours(new Date(), 46),
};
