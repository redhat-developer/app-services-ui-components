import { ComponentMeta, ComponentStory } from "@storybook/react";

import { StatusLabel } from "./StatusLabel";

export default {
  component: StatusLabel,
  args: {
    instanceName: "string",
  },
} as ComponentMeta<typeof StatusLabel>;

const Template: ComponentStory<typeof StatusLabel> = (args) => (
  <StatusLabel {...args} />
);

export const AllStatutesAtOnce = () => (
  <>
    <pre>ready</pre>
    <StatusLabel value={"ready"} />
    <br />
    <pre>accepted</pre>
    <StatusLabel value={"accepted"} />
    <br />
    <pre>provisioning</pre>
    <StatusLabel value={"provisioning"} />
    <br />
    <pre>preparing</pre>
    <StatusLabel value={"preparing"} />
    <br />
    <pre>accepted</pre> over 15 minutes
    <StatusLabel value={"accepted"} showWarning={true} />
    <br />
    <pre>accepted</pre> over 30 minutes
    <StatusLabel value={"accepted"} showError={true} />
    <br />
    <pre>deleting</pre>
    <StatusLabel value={"deleting"} />
    <br />
    <pre>deprovision</pre>
    <StatusLabel value={"deprovision"} />
    <br />
    <pre>failed</pre>
    <StatusLabel value={"failed"} />
    <br />
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

export const Accepted = Template.bind({});
Accepted.args = {
  value: "accepted",
};
Accepted.parameters = {
  docs: {
    description: {
      story:
        'A user has just selected to create a Kafka instance. The "Creating" status is shown in the table along with some grey text informing the user that their instance will be ready shortly. (The "Creating" status is clickable which opens a popover with more in-depth information about the creation process).',
    },
  },
};

export const Provisioning = Template.bind({});
Provisioning.args = {
  value: "provisioning",
};
Provisioning.parameters = Accepted.parameters;

export const Preparing = Template.bind({});
Preparing.args = {
  value: "preparing",
};
Preparing.parameters = Accepted.parameters;

export const CreatingOver15Minutes = Template.bind({});
CreatingOver15Minutes.args = {
  value: "accepted",
  showWarning: true,
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
  value: "accepted",
  showError: true,
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

export const Deprovision = Template.bind({});
Deprovision.args = {
  value: "deprovision",
};
Deprovision.parameters = Deleting.parameters;

export const Failed = Template.bind({});
Failed.args = {
  value: "failed",
};
Failed.parameters = {
  docs: {
    description: {
      story: "Something has gone wrong with the Kafka instance .",
    },
  },
};
