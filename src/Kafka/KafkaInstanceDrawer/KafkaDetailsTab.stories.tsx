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
  ingress: 50,
  egress: 50,
  storage: 50,
  maxPartitions: 1500,
  connections: 2000,
  connectionRate: 100,
  messageSize: 1,
};

export const StandardInstanceCreated = Template.bind({});
StandardInstanceCreated.args = {
  instanceType: "standard",
  size: "x1",
  ...instanceInfo,
};

export const TrialInstanceJustCreated = Template.bind({});
TrialInstanceJustCreated.args = {
  expiryDate: addHours(new Date(), 48),
  instanceType: "eval",
  ...instanceInfo,
};
TrialInstanceJustCreated.doc = {};

export const TrialIntsanceRecentlyCreated = Template.bind({});
TrialIntsanceRecentlyCreated.args = {
  expiryDate: addHours(new Date(), 22),
  instanceType: "eval",
  ...instanceInfo,
};

export const TrialInstanceNearExpiration = Template.bind({});
TrialInstanceNearExpiration.args = {
  expiryDate: addHours(new Date(), 2),
  instanceType: "eval",
  ...instanceInfo,
};
