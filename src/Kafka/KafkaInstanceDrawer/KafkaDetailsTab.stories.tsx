import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { addHours } from "date-fns";
import type { MarketplaceSubscription } from "../CreateKafkaInstance";
import { KafkaDetailsTab } from "./KafkaDetailsTab";

const billingValues: { [key: string]: MarketplaceSubscription | "prepaid" } = {
  prepaid: "prepaid",
  aws: { marketplace: "aws", subscription: "aws-123" },
  azure: { marketplace: "azure", subscription: "azure-123" },
  rhm: { marketplace: "rhm", subscription: "rhm-123" },
};

export default {
  component: KafkaDetailsTab,
  args: {
    instanceType: "standard",
    size: "1",
    id: "c7tkgchgb2d04561srg",
    owner: "snaithan_kafka_devexp",
    region: "US East, N. Virginia",
    createdAt: new Date(2022, 6, 2),
    updatedAt: new Date(2022, 6, 2),
    ingress: 50,
    egress: 50,
    storage: 50,
    maxPartitions: 1500,
    connections: 2000,
    connectionRate: 100,
    messageSize: 1,
    billing: "prepaid",
  },
  argTypes: {
    billing: {
      control: "radio",
      options: Object.keys(billingValues),
      mapping: billingValues,
    },
  },
} as ComponentMeta<typeof KafkaDetailsTab>;

const Template: ComponentStory<typeof KafkaDetailsTab> = (args) => (
  <KafkaDetailsTab {...args} />
);
export const StandardInstanceCreated = Template.bind({});
StandardInstanceCreated.args = {};

export const TrialInstanceJustCreated = Template.bind({});
TrialInstanceJustCreated.args = {
  expiryDate: addHours(new Date(), 48),
  instanceType: "eval",
};
// @ts-ignore
TrialInstanceJustCreated.doc = {};

export const TrialInstanceRecentlyCreated = Template.bind({});
TrialInstanceRecentlyCreated.args = {
  expiryDate: addHours(new Date(), 22),
  instanceType: "eval",
};

export const TrialInstanceNearExpiration = Template.bind({});
TrialInstanceNearExpiration.args = {
  expiryDate: addHours(new Date(), 2),
  instanceType: "eval",
};

export const MissingDataShownAsSkeletonLoaders = Template.bind({});
MissingDataShownAsSkeletonLoaders.args = {
  size: undefined,
  ingress: undefined,
  egress: undefined,
  storage: undefined,
  maxPartitions: undefined,
  connections: undefined,
  connectionRate: undefined,
  messageSize: undefined,
  billing: undefined,
};
