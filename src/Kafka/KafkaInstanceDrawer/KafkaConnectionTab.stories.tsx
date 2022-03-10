import { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaConnectionTab } from "./KafkaConnectionTab";

export default {
  component: KafkaConnectionTab,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof KafkaConnectionTab>;

const Template: ComponentStory<typeof KafkaConnectionTab> = (args) => (
  <KafkaConnectionTab {...args} />
);

export const ConnectionTab = Template.bind({});
ConnectionTab.args = {
  isKafkaPending: false,
  externalServer: "hema-test-c-k-l-kafka-stage.rhcloud.com:443",
  tokenEndPointUrl:
    "https://identify.api.stage.openshift.com/auth/realms/rhoas/protocol/openid-coonect/token",
  linkToServiceAccount: "/to-service-account",
  linkToAccessTab: "/to-access-tab",
};

export const ConnectionTabWhenkafkaCreationPending = Template.bind({});
ConnectionTabWhenkafkaCreationPending.args = {
  isKafkaPending: true,
  externalServer: "hema-test-c-k-l-kafka-stage.rhcloud.com:443",
  tokenEndPointUrl:
    "https://identify.api.stage.openshift.com/auth/realms/rhoas/protocol/openid-coonect/token",
  linkToServiceAccount: "/to-service-account",
  linkToAccessTab: "/to-access-tab",
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
