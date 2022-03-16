import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { ResourceType } from "./ResourceType";

export default {
  component: ResourceType,
  args: { resourceTypeValue: undefined },
} as ComponentMeta<typeof ResourceType>;

const Template: ComponentStory<typeof ResourceType> = (args) => (
  <div style={{ height: "90vh", display: "flex", alignItems: "end" }}>
    <ResourceType {...args} />
  </div>
);
export const InteractiveExample: ComponentStory<typeof ResourceType> = () => {
  const [resourceTypeValue, setResourceTypeValue] = useState<
    string | undefined
  >(undefined);
  return (
    <div style={{ height: "90vh", display: "flex", alignItems: "end" }}>
      <ResourceType
        resourceTypeValue={resourceTypeValue}
        onChangeValue={setResourceTypeValue}
      />
    </div>
  );
};
InteractiveExample.parameters = {
  docs: {
    description: {
      story: `A user can select a valid resource type, the initial select value is undefined with placeholder text as Select type `,
    },
  },
};
export const InitialState = Template.bind({});
InitialState.args = {};
InitialState.parameters = {
  docs: {
    description: {
      story: `A user can select a valid resource type and see their action being loged in the actions tab `,
    },
  },
};
