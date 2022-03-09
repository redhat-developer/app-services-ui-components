import { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaConnectionTab } from "./KafkaConnectionTab";

export default {
  component: KafkaConnectionTab,
  args: {
    isKafkaPending: false,
    externalServer: "hema-test-c-k-l-kafka-stage.rhcloud.com:443",
    tokenEndPointUrl:
      "https://identify.api.stage.openshift.com/auth/realms/rhoas/protocol/openid-coonect/token",
    linkToServiceAccount: "/to-service-account",
    linkToAccessTab: "/to-access-tab",
  },
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
