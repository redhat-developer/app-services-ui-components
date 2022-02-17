import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TableStatus } from "./tableStatus";

export default {
  component: TableStatus,
  args: {
    value: "ready",
  },
} as ComponentMeta<typeof TableStatus>;

const Template: ComponentStory<typeof TableStatus> = (args) => (
  <TableStatus {...args} />
);

export const AllStatutesAtOnce = () => (
  <>
    <TableStatus value={"ready"} />
    <br />
    <TableStatus value={"creating"} />
    <br />
    <TableStatus value={"creatingWarning"} />
    <br />
    <TableStatus value={"creatingError"} />
    <br />
    <TableStatus value={"deleting"} />
    <br />
    <TableStatus value={"degraded"} />
  </>
);

export const Ready = Template.bind({});
Ready.args = {
  value: "ready",
};
Ready.parameters = {
  docs: {
    description: {
      story:
        "The Kafka instance was successfully created and is now either ready for use or in use.",
    },
  },
};

export const Creating = Template.bind({});
Creating.args = {
  value: "creating",
};
Creating.parameters = {
  docs: {
    description: {
      story:
        'A user has just selected to create a Kafka instance. The "Creating" status is shown in the table along with some grey text informing the user that their instance will be ready shortly. (The "Creating" status is clickable which opens a popover with more in-depth information about the creation process).',
    },
  },
};

export const CreatingOver15Minutes = Template.bind({});
CreatingOver15Minutes.args = {
  value: "creatingWarning",
};
CreatingOver15Minutes.parameters = {
  docs: {
    description: {
      story:
        'The instance creation is taking longer than fifteen minutes. This is significantly longer than expected. A plain inline warning alert displays below the "Creating" status in the table.',
    },
  },
};

export const CreatingOver30Minutes = Template.bind({});
CreatingOver30Minutes.args = {
  value: "creatingError",
};
CreatingOver30Minutes.parameters = {
  docs: {
    description: {
      story:
        'The instance creation is taking longer than thirty minutes. This is significantly longer than expected. An error plain inline alert displays below the "Creating" status in the table.',
    },
  },
};

export const Deleting = Template.bind({});
Deleting.args = {
  value: "deleting",
};
Deleting.parameters = {
  docs: {
    description: {
      story:
        "The user has selected to delete the Kafka instance and it is in the process of being deleted.",
    },
  },
};

export const Degraded = Template.bind({});
Degraded.args = {
  value: "degraded",
};
Degraded.parameters = {
  docs: {
    description: {
      story: "Instance is reporting an error. The Kafka is not in a good state. ",
    },
  },
};
