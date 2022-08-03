import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Settings } from "./Settings";
import { fakeApi } from "../../shared/storiesHelpers";
import { SettingsStatus } from "./types";

export default {
  component: Settings,
  args: {
    ConnectionStatus: "On",
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = () => {
  const [connectionStatus, setConnectionStatus] =
    useState<SettingsStatus>("On");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<"success" | "failure" | undefined>(
    undefined
  );

  const [AlertStatus, setAlertStatus] = useState<boolean>(false);

  const onSwitchClick = () => {
    if (connectionStatus === "On") {
      setIsModalOpen(true);
    } else {
      setConnectionStatus("TurningOn");
      fakeApi<{ ConfigurationOff: boolean }>(
        {
          ConfigurationOff: false,
        },
        2000
      )
        .then(() => {
          setConnectionStatus("On");
          setAlertStatus(true);
          setIsLoading("success");
        })
        .catch(() => {});
    }
  };

  const onClickTurnOff = () => {
    setIsModalOpen(false);
    setConnectionStatus("TurningOff");
    fakeApi<{ ConfigurationOff: boolean }>(
      {
        ConfigurationOff: false,
      },
      2000
    )
      .then(() => {
        setConnectionStatus("Off");
        setAlertStatus(false);
        setIsLoading("success");
      })
      .catch(() => {});
  };

  const onClickClose = () => {
    setIsModalOpen(false);
  };

  const onClickCloseAction = () => {};

  return (
    <Settings
      connectionStatus={connectionStatus}
      onSwitchClick={onSwitchClick}
      isModalOpen={isModalOpen}
      onClickTurnOff={onClickTurnOff}
      isLoading={isLoading}
      AlertStatus={AlertStatus}
      onClickClose={onClickClose}
      onClickCloseAction={onClickCloseAction}
    />
  );
};

export const DefaultSettings = Template.bind({});
