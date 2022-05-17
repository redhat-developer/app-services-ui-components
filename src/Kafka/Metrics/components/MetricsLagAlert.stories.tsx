import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { MetricsLagAlert } from "./MetricsLagAlert";

export default {
  component: MetricsLagAlert,
  args: {},
} as ComponentMeta<typeof MetricsLagAlert>;

const Template: ComponentStory<typeof MetricsLagAlert> = () => {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const onClickClose = () => {
    setIsClosed(!isClosed);
  };

  return <MetricsLagAlert isClosed={isClosed} onClickClose={onClickClose} />;
};

export const LagMessage = Template.bind({});
