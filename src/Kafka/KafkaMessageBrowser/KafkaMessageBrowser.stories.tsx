import { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaMessageBrowser } from "./KafkaMessageBrowser";
import { fakeApi } from "../../shared/storiesHelpers";
import { Message } from "./types";

export default {
  component: KafkaMessageBrowser,
  args: {},
} as ComponentMeta<typeof KafkaMessageBrowser>;

const Template: ComponentStory<typeof KafkaMessageBrowser> = (args) => (
  <KafkaMessageBrowser {...args}>todo</KafkaMessageBrowser>
);

export const Example = Template.bind({});
Example.args = {
  getMessages: () =>
    fakeApi<{ messages: Message[]; partitions: number }>(
      {
        messages: [
          {
            partition: 0,
            offset: 78,
            timestamp: new Date("2022-03-15T14:11:57.102Z"),
            headers: {
              random: `${Math.random()}`,
            },
            value: "{'user': 'user1', 'message': 'message1'}",
          },
          {
            key: "key",
            partition: 0,
            offset: 79,
            timestamp: new Date("2022-03-15T14:11:57.103Z"),
            headers: {
              random: `${Math.random()}`,
            },
            value: "{'user': 'user2', 'message': 'message2'}",
          },
        ],
        partitions: 19,
      },
      500
    ),
};

export const InitialLoading = Template.bind({});
InitialLoading.args = {
  getMessages: () => new Promise(() => false),
};

export const NoResults = Template.bind({});
NoResults.args = {
  getMessages: () =>
    fakeApi<{ messages: Message[]; partitions: number }>(
      { messages: [], partitions: 0 },
      100
    ),
};
