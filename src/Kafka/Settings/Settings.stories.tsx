import type { AlertProps } from "@rhoas/app-services-ui-shared";
import { AlertVariant } from "@rhoas/app-services-ui-shared";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Settings } from "./Settings";
import { fakeApi } from "../../shared/storiesHelpers";

export default {
  component: Settings,
  args: {},
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = () => {
  const [isChecked, setIschecked] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<AlertProps[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = () => {
    setIsModalOpen(true);
  };

  const addAlert = (
    title: string,
    variant: AlertProps["variant"],
    description: string,
    id: string | undefined
  ) => {
    setShowAlert([...showAlert, { title, variant, description, id }]);
  };

  const onDisable = () => {
    setIsModalOpen(false);
    setIschecked(false);
    setIsLoading(true);
    fakeApi<{ ConfigurationOff: boolean }>(
      {
        ConfigurationOff: false,
      },
      2000
    )
      .then(() => {
        addAlert(
          "Connection re-authentication is turrning off",
          AlertVariant.success,
          "Broker is restarting to apply the new configurations. This process might take several minutes",
          "success-alert"
        ),
          setIsLoading(false);
      })
      .catch(() =>
        addAlert(
          "Something went wrong",
          AlertVariant.danger,
          "We're unable to update connection re-authentication at this time, Try again later.",
          "danger-alert"
        )
      );
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const closeAlertAction = (id: string | undefined) => {
    setShowAlert([...showAlert.filter((alert) => alert.id !== id)]);
  };

  return (
    <Settings
      isChecked={isChecked}
      isModalOpen={isModalOpen}
      onChange={onChange}
      onDisable={onDisable}
      onClose={onClose}
      showAlert={showAlert}
      closeAlertAction={closeAlertAction}
      isLoading={isLoading}
    />
  );
};

export const DefaultSettings = Template.bind({});
