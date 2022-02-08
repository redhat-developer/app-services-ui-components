import { ComponentStory, ComponentMeta } from "@storybook/react";
import { subHours } from "date-fns";
import React from "react";
import { DetailsTab } from "./DetailsTab";

export default {
  title: "Components/KafkaInstanceDrawer/DetailsTab",
  component: DetailsTab,
  args: {
    id: "c7tkgchgb2d04561srg",
    owner: "snaithan_kafka_devexp",
    region: "US East, N. Virginia",
    created_at: new Date(),
    updated_at: new Date(),
  },
} as ComponentMeta<typeof DetailsTab>;

const Template: ComponentStory<typeof DetailsTab> = (args) => (
  <DetailsTab {...args} />
);

export const JustCreated = Template.bind({});
JustCreated.args = {};

export const CreatedSomeTimeAgo = Template.bind({});
CreatedSomeTimeAgo.args = {
  created_at: subHours(new Date(), 25),
};

export const CreatedLongTimeAgo = Template.bind({});
CreatedLongTimeAgo.args = {
  created_at: subHours(new Date(), 46),
};
