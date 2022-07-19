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

const Template: ComponentStory<typeof CreateTopicHead> = (args) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);

  const onClick = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };
  return (
    <CreateTopicHead
      {...args}
      isSwitchChecked={isSwitchChecked}
      setIsSwitchChecked={onClick}
    />
  );
};

export const Story = Template.bind({});
Story.args = {};
