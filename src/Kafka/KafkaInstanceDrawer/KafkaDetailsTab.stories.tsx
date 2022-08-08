import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { addHours } from "date-fns";
import type { MarketplaceSubscription } from "../CreateKafkaInstance";
import { KafkaDetailsTab } from "./KafkaDetailsTab";

export default {
  component: KafkaDetailsTab,
  args: {
    id: "c7tkgchgb2d04561srg",
    owner: "snaithan_kafka_devexp",
    region: "US East, N. Virginia",
    createdAt: new Date(2022, 6, 2),
    updatedAt: new Date(2022, 6, 2),
    billingOpt: "prepaid",
  },
  argTypes: {
    billing: {
      control: null,
    },
    billingOpt: {
      control: "radio",
      options: ["prepaid", "aws", "azure", "rhm"],
    },
  },
} as ComponentMeta<typeof KafkaDetailsTab>;

const Template: ComponentStory<typeof KafkaDetailsTab> = (args) => {
  const billingValues: { [key: string]: MarketplaceSubscription | "prepaid" } =
    {
      prepaid: "prepaid",
      aws: { marketplace: "aws", subscription: "aws-123" },
      azure: { marketplace: "azure", subscription: "azure-123" },
      rhm: { marketplace: "rhm", subscription: "rhm-123" },
    };
  const billingOpt = (args as typeof args & { billingOpt: string })
    .billingOpt as keyof typeof billingValues;
  return (
    <KafkaDetailsTab
      {...args}
      billing={args.billing || billingValues[billingOpt]}
    />
  );
};

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
  size: "1",
  ...instanceInfo,
  isLoading: false,
};

export const TrialInstanceJustCreated = Template.bind({});
TrialInstanceJustCreated.args = {
  expiryDate: addHours(new Date(), 48),
  instanceType: "eval",
  ...instanceInfo,
  isLoading: false,
};
// @ts-ignore
TrialInstanceJustCreated.doc = {};

export const TrialInstanceRecentlyCreated = Template.bind({});
TrialInstanceRecentlyCreated.args = {
  expiryDate: addHours(new Date(), 22),
  instanceType: "eval",
  ...instanceInfo,
  isLoading: false,
};

export const TrialInstanceNearExpiration = Template.bind({});
TrialInstanceNearExpiration.args = {
  expiryDate: addHours(new Date(), 2),
  instanceType: "eval",
  ...instanceInfo,
  isLoading: false,
};

export const KafkaDetailsWithSkeleton = Template.bind({});
KafkaDetailsWithSkeleton.args = {
  instanceType: "standard",
  size: "1",
  ...instanceInfo,
  isLoading: true,
};
