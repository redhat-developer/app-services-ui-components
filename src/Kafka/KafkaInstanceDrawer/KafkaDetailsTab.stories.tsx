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

export const NormalInstance = Template.bind({});
NormalInstance.args = {};

export const TrialInstanceJustCreated = Template.bind({});
TrialInstanceJustCreated.args = {
  expiryDate: addHours(new Date(), 48),
};

export const TrialIntsanceRecentlyCreated = Template.bind({});
TrialIntsanceRecentlyCreated.args = {
  expiryDate: addHours(new Date(), 22),
};

export const TrialInstanceNearExpiration = Template.bind({});
TrialInstanceNearExpiration.args = {
  expiryDate: addHours(new Date(), 2),
};
