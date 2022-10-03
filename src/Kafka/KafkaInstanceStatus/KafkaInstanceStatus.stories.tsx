import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { sub } from "date-fns";
import { StatusLabel, StatusPopover } from "./components";
import * as popoverStories from "./components/StatusPopover.stories";

import { KafkaInstanceStatus } from "./KafkaInstanceStatus";

export default {
  component: KafkaInstanceStatus,
  subcomponents: {
    StatusLabel,
    StatusPopover,
  },
  args: {
    createdAt: new Date(),
  },
} as ComponentMeta<typeof KafkaInstanceStatus>;

const Template: ComponentStory<typeof KafkaInstanceStatus> = (
  args,
  { viewMode }
) => {
  const inDocs = viewMode === "docs";
  return (
    <div style={{ paddingTop: inDocs ? 0 : 250 }}>
      <KafkaInstanceStatus {...args} />
    </div>
  );
};

export const Accepted = Template.bind({});
Accepted.args = {
  status: "accepted",
};

export const Provisioning = Template.bind({});
Provisioning.args = {
  status: "provisioning",
};

export const Preparing = Template.bind({});
Preparing.args = {
  status: "preparing",
};

export const CreatingOver15Minutes = Template.bind({});
CreatingOver15Minutes.args = {
  status: "accepted",
  createdAt: sub(new Date(), { minutes: 19 }),
};
CreatingOver15Minutes.parameters =
  popoverStories.CreatingOver15Minutes.parameters;

export const CreatingOver30Minutes = Template.bind({});
CreatingOver30Minutes.args = {
  status: "accepted",
  createdAt: sub(new Date(), { minutes: 38 }),
};
CreatingOver30Minutes.parameters =
  popoverStories.CreatingOver30Minutes.parameters;

export const Deprovision = Template.bind({});
Deprovision.args = {
  status: "deprovision",
};

export const Deleting = Template.bind({});
Deleting.args = {
  status: "deleting",
};

export const Ready = Template.bind({});
Ready.args = {
  status: "ready",
};

export const Degraded = Template.bind({});
Degraded.args = {
  status: "degraded",
};

export const Suspended = Template.bind({});
Suspended.args = {
  status: "suspended",
};
