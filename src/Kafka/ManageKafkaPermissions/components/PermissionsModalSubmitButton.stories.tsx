import { SubmitButton } from "./PermissionsModalSubmitButton";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

export default {
  component: SubmitButton,
  args: {},
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => (
  <SubmitButton {...args} />
);
export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = { isButtonDisabled: true, step: 1 };
ButtonDisabled.parameters = {
  docs: {
    description: {
      story: `The button is disabled becasue a valid user or service account has not been selected`,
    },
  },
};
export const ButtonEnabled = Template.bind({});
ButtonEnabled.args = { isButtonDisabled: false, step: 1 };
ButtonEnabled.parameters = {
  docs: {
    description: {
      story: `The button is enabled becasue a valid user or service account has been selected`,
    },
  },
};

export const ButtonStepTwo = Template.bind({});
ButtonStepTwo.args = { isButtonDisabled: false, step: 2 };
ButtonStepTwo.parameters = {
  docs: {
    description: {
      story: `After selecting a valid account, we move to step 2 of the modal with a save button`,
    },
  },
};

export const InteractiveExample: ComponentStory<typeof SubmitButton> = () => {
  const [step, setStep] = useState<number>(1);
  return (
    <SubmitButton step={step} onChangeStep={setStep} isButtonDisabled={false} />
  );
};
InteractiveExample.parameters = {
  docs: {
    description: {
      story: `Interactive example for when buton is enabled. Clicking it moves us to step two and changes the button label from next to save `,
    },
  },
};
