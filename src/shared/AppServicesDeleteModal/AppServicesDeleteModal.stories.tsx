import React from "react";
import { ButtonVariant } from "@patternfly/react-core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AppServicesDeleteModal } from "./AppServicesDeleteModal";

export default {
  title: "Shared Components/Delete Modal",
  component: AppServicesDeleteModal,
  parameters: {
    previewHeight: 500,
  },
} as ComponentMeta<typeof AppServicesDeleteModal>;

const Template: ComponentStory<typeof AppServicesDeleteModal> = (
  args,
  { parameters }
) => (
  <div style={{ height: parameters.previewHeight }}>
    <AppServicesDeleteModal {...args} />
  </div>
);

export const DeleteWithoutConfirmInputFiled = Template.bind({});
DeleteWithoutConfirmInputFiled.args = {
  isModalOpen: true,
  title: "Delete Instance?",
  textInputProps: {
    showTextInput: false,
  },
  textProps: {
    description: "<b>ajay-test</b> will be deleted.",
  },
  confirmButtonProps: {
    id: "confirm__button",
    key: "confirm-button",
    variant: ButtonVariant.danger,
    onClick: () => {},
    isDisabled: false,
    label: "Delete",
    isLoading: false,
  },
  cancelButtonProps: {
    id: "cancel__button",
    key: "cancel-button",
    variant: ButtonVariant.link,
    label: "Cancel",
  },
};
DeleteWithoutConfirmInputFiled.storyName =
  "Delete Modal without confirm input filed";

export const DeleteWithConfirmInputFiled = Template.bind({});
DeleteWithConfirmInputFiled.args = {
  isModalOpen: false,
  title: "Delete Instance?",
  textProps: {
    description: "<b>ajay-test</b> will be deleted.",
  },
  textInputProps: {
    showTextInput: true,
    label: "Type <b>ajay-test</b> to confirm:",
  },
  confirmButtonProps: {
    id: "confirm__button",
    key: "confirm-button",
    variant: ButtonVariant.danger,
    onClick: () => {},
    isDisabled: true,
    label: "Delete",
    isLoading: false,
  },
  cancelButtonProps: {
    id: "cancel__button",
    key: "cancel-button",
    variant: ButtonVariant.link,
    label: "Cancel",
  },
};
DeleteWithConfirmInputFiled.storyName = "Delete Modal with confirm input filed";
