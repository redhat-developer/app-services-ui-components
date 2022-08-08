import { useState } from "react";
import { Button } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TermsAndConditionModal } from "./TermsAndConditionModal";

export default {
  component: TermsAndConditionModal,
  agrs: {},
} as ComponentMeta<typeof TermsAndConditionModal>;

const Template: ComponentStory<typeof TermsAndConditionModal> = (args) => {
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
        {...args}
        onCancel={onCancel}
        isModalOpen={isOpen}
      />
    </>
  );
};

export const KafkaTermsAndCondition_Modal = Template.bind({});
KafkaTermsAndCondition_Modal.args = {
  serviceName: "Kafka",
  ouiaIdModal: "modal-KafkaTerms",
  ouiaIdButtonViewTerms: "button-view-terms",
  ouiaIdButtonCancel: "button-cancel",
};

export const ServiceRegistryTermsAndCondition_Modal = Template.bind({});
ServiceRegistryTermsAndCondition_Modal.args = {
  serviceName: "Service Registry",
  ouiaIdModal: "modal-ServiceRegistryTerms",
  ouiaIdButtonViewTerms: "button-view-terms",
  ouiaIdButtonCancel: "button-cancel",
};
