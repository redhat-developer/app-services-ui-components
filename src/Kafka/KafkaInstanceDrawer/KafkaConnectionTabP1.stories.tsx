import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaConnectionTabP1 } from "./KafkaConnectionTabP1";

export default {
  component: KafkaConnectionTabP1,
  args: {
    externalServer: "hema-test-c-k-l-kafka-stage.rhcloud.com:443",
    tokenEndPointUrl:
      "https://identify.api.stage.openshift.com/auth/realms/rhoas/protocol/openid-connect/token",
    linkToServiceAccount: "/to-service-account",
    linkToAccessTab: "/to-access-tab",
    kafkaFleetManagerUrl:
      "https://api.openshift.com/api/kafkas_mgmt/v1/openapi",
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof KafkaConnectionTabP1>;

const Template: ComponentStory<typeof KafkaConnectionTabP1> = (args) => (
  <KafkaConnectionTabP1 {...args} />
);

export const ConnectionTab = Template.bind({});
ConnectionTab.args = {
  isKafkaPending: false,
  adminAPIUrl: "https://admin-server-[name of instance]-[domain]/openapi",
};

export const ConnectionTabWhenkafkaCreationPending = Template.bind({});
ConnectionTabWhenkafkaCreationPending.args = {
  isKafkaPending: true,
};
ConnectionTabWhenkafkaCreationPending.storyName =
  "Connection tab when Kafka Creation pending";
ConnectionTabWhenkafkaCreationPending.parameters = {
  previewHeight: 200,
  docs: {
    description: {
      story: `
        Copy clipboard is disable in Bootstrap server and Token endpoint URL when the kafka creation is pending  
      `,
    },
  },
};
