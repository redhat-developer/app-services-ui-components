import { Modal } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { ResourceType } from "./ResourceType";

export default {
  component: ResourceType,
  args: { resourceTypeValue: undefined },
} as ComponentMeta<typeof ResourceType>;

const Template: ComponentStory<typeof ResourceType> = (args, { id }) => {
  return (
    <Modal
      title="Simple modal header"
      isOpen={true}
      appendTo={() => document.getElementById(id) || document.body}
      disableFocusTrap={true}
    >
      <ResourceType {...args} />
    </Modal>
  );
};
export const InteractiveExample: ComponentStory<typeof ResourceType> = (
  _,
  { id }
) => {
  const [resourceTypeValue, setResourceTypeValue] = useState<
    string | undefined
  >(undefined);
  return (
    <Modal
      title="Simple modal header"
      isOpen={true}
      appendTo={() => document.getElementById(id) || document.body}
      disableFocusTrap={true}
    >
      <ResourceType
        resourceTypeValue={resourceTypeValue}
        onChangeValue={setResourceTypeValue}
        initialOpen={true}
      />
    </Modal>
  );
};
InteractiveExample.parameters = {
  docs: {
    description: {
      story: `A user can select a valid resource type. A placeholder is shown until an option is selected`,
    },
  },
};
export const InitialState = Template.bind({});
InitialState.args = { initialOpen: true };
InitialState.parameters = {
  docs: {
    description: {
      story: `A user can select a valid resource type and see their action being logged in the actions tab `,
    },
  },
};
