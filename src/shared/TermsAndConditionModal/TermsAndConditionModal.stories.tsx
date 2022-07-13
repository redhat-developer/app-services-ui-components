import { useState } from "react";
import { Button } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TermsAndConditionModal } from "./TermsAndConditionModal";

export default {
  component: TermsAndConditionModal,
  agrs: {},
} as ComponentMeta<typeof TermsAndConditionModal>;

const Template: ComponentStory<typeof TermsAndConditionModal> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCancel = () => {
    setIsOpen(false);
  };

  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button variant="primary" onClick={onClick}>
        Show TermsAndConditions Modal
      </Button>
      <TermsAndConditionModal
        onCancel={onCancel}
        onClick={() => {
          /* do nothing */
        }}
        isModalOpen={isOpen}
      />
    </>
  );
};

export const TermsAndCondition_Modal = Template.bind({});
