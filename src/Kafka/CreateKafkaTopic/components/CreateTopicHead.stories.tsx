import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import { CreateTopicHead } from "./CreateTopicHead";

export default {
  component: CreateTopicHead,
  args: {
    kafkaName: "test-kafka",
    kafkaPageLink: "test-topics",
    kafkaInstanceLink: "test-instance",
  },
} as ComponentMeta<typeof CreateTopicHead>;

const Template: ComponentStory<typeof CreateTopicHead> = (args) => (
  <CreateTopicHead {...args} />
);

const InteractiveExample: ComponentStory<typeof CreateTopicHead> = (args) => {
  const [isSwitchClicked, setIsSwitchClicked] = useState<boolean>(false);

  const onClick = () => {
    setIsSwitchClicked(!isSwitchClicked);
  };

  return (
    <CreateTopicHead
      {...args}
      isSwitchClicked={isSwitchClicked}
      setIsSwitchClicked={onClick}
    />
  );
};

InteractiveExample.parameters = {
  docs: {
    description: {
      story: `A user can view the kafka instance for which the topic will be created, 
      and use the switch to jump between the basic and advanced views for creating a topic `,
    },
  },
};

export const EmptyState = Template.bind({});
EmptyState.args = {};
