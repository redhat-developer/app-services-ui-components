import { Page } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { addHours } from "date-fns";
import { KafkaInstancesPage as KafkaInstancesPageComp } from "./KafkaInstancesPage";

const now = new Date().toISOString();
const future = addHours(new Date(), 19).toISOString();

export default {
  component: KafkaInstancesPageComp,
  args: {},
} as ComponentMeta<typeof KafkaInstancesPageComp>;

const Template: ComponentStory<typeof KafkaInstancesPageComp> = (args) => (
  <Page>
    <KafkaInstancesPageComp {...args} />
  </Page>
);

export const KafkaInstancesPage = Template.bind({});
KafkaInstancesPage.args = {
  instances: [
    {
      id: "1",
      name: "foo",
      createdAt: now,
      updatedAt: now,
      expiryDate: undefined,
      owner: "owner",
      provider: "aws",
      region: "region",
      status: "provisioning",
      plan: "standard",
      size: "1",
      ingress: undefined,
      egress: undefined,
      storage: undefined,
      maxPartitions: undefined,
      connections: undefined,
      connectionRate: undefined,
      messageSize: undefined,
      billing: undefined,
    },
    {
      id: "2",
      name: "bar",
      createdAt: now,
      updatedAt: now,
      expiryDate: future,
      owner: "owner",
      provider: "aws",
      region: "region",
      status: "deleting",
      plan: "developer",
      size: "1",
      ingress: undefined,
      egress: undefined,
      storage: undefined,
      maxPartitions: undefined,
      connections: undefined,
      connectionRate: undefined,
      messageSize: undefined,
      billing: undefined,
    },
    {
      id: "2",
      name: "baz",
      createdAt: now,
      updatedAt: now,
      expiryDate: future,
      owner: "owner",
      provider: "aws",
      region: "region",
      status: "ready",
      plan: "developer",
      size: "1",
      ingress: undefined,
      egress: undefined,
      storage: undefined,
      maxPartitions: undefined,
      connections: undefined,
      connectionRate: undefined,
      messageSize: undefined,
      billing: undefined,
    },
  ],
};
