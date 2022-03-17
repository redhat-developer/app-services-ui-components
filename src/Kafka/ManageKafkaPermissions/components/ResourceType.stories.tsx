import { Modal, ValidatedOptions, Form } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ResourceType } from "./ResourceType";

export default {
  component: ResourceType,
  args: {
    resourceTypeValue: undefined,
    resourceTypeValidated: ValidatedOptions.default,
  },
} as ComponentMeta<typeof ResourceType>;

const Template: ComponentStory<typeof ResourceType> = (args, { id }) => {
  return (
    <Modal
      title="Simple modal header"
      isOpen={true}
      appendTo={() => document.getElementById(id) || document.body}
      disableFocusTrap={true}
    >
      <Form>
        <ResourceType {...args} />
      </Form>
    </Modal>
  );
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
export const InvalidSelection = Template.bind({});
InvalidSelection.args = { resourceTypeValidated: ValidatedOptions.error };
InvalidSelection.parameters = {
  docs: {
    description: {
      story: `Form error when user clicks on submit without selecting a valid value `,
    },
  },
};
