import { ComponentMeta, ComponentStory } from "@storybook/react";
import { addHours } from "date-fns";
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

const instanceInfo = {
  ingress: "up to 50 MiB/second",
  egress: "up to 50 MiB/second",
  storage: "up to 1000 GiB",
  maxPartitions: "up to 1500",
  connections: "up to 2000",
  connectionRate: "up to 100 connections/seconds",
  messageSize: "up to 1 MiB",
};

export const StandardInstanceCreated = Template.bind({});
StandardInstanceCreated.args = {
  instanceType: "standard",
  size: "1 streaming unit",
  ...instanceInfo,
  isTesting: true,
};

export const TrialInstanceJustCreated = Template.bind({});
TrialInstanceJustCreated.args = {
  expiryDate: addHours(new Date(), 48),
  instanceType: "eval",
  ...instanceInfo,
  isTesting: true,
};
TrialInstanceJustCreated.doc = {};

export const TrialIntsanceRecentlyCreated = Template.bind({});
TrialIntsanceRecentlyCreated.args = {
  expiryDate: addHours(new Date(), 22),
  instanceType: "eval",
  isTesting: true,
  ...instanceInfo,
};

export const TrialInstanceNearExpiration = Template.bind({});
TrialInstanceNearExpiration.args = {
  expiryDate: addHours(new Date(), 2),
  instanceType: "eval",
  isTesting: true,
  ...instanceInfo,
};
