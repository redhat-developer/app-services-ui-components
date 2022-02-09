import { ComponentStory, ComponentMeta } from "@storybook/react";
import { addHours, subHours } from "date-fns";
import React from "react";
import { KafkaDetailsTab } from "./KafkaDetailsTab";

export default {
  component: KafkaDetailsTab,
  args: {
    id: "c7tkgchgb2d04561srg",
    owner: "snaithan_kafka_devexp",
    region: "US East, N. Virginia",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
} as ComponentMeta<typeof KafkaDetailsTab>;

const Template: ComponentStory<typeof KafkaDetailsTab> = (args) => (
  <KafkaDetailsTab {...args} />
);

export const NoTimeLimit = Template.bind({});
NoTimeLimit.args = {};

export const JustCreated = Template.bind({});
JustCreated.args = {
  expiryDate: addHours(new Date(), 48),
};

export const CreatedSomeTimeAgo = Template.bind({});
CreatedSomeTimeAgo.args = {
  expiryDate: addHours(new Date(), 22),
};

export const CreatedLongTimeAgo = Template.bind({});
CreatedLongTimeAgo.args = {
  expiryDate: addHours(new Date(), 2),
};
