import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Settings } from "./Settings";
import { apiError, fakeApi } from "../../shared/storiesHelpers";
import type { SettingsStatus } from "./types";

export default {
  component: Settings,
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

  const [alertStatus, setAlertStatus] = useState<
    "success" | "failure" | undefined
  >(undefined);

  const [connectionState, setConnectionState] = useState<boolean>(false);

  const onSwitchClick = () => {
    if (connectionStatus === "On") {
      setIsModalOpen(true);
    } else {
      setConnectionStatus("TurningOn");
      apiError<{ ConfigurationOff: boolean }>(
        {
          ConfigurationOff: undefined,
        },
        4000
      )
        .then(() => {
          setConnectionStatus("On");
          setConnectionState(true);
          setAlertStatus("success");
        })
        .catch(() => {
          setConnectionStatus("Off");
          setAlertStatus("failure");
        });
    }
  };

  const onClickTurnOff = () => {
    setIsModalOpen(false);
    setConnectionStatus("TurningOff");
    fakeApi<{ ConfigurationOff: boolean }>(
      {
        ConfigurationOff: false,
      },
      4000
    )
      .then(() => {
        setConnectionStatus("Off");
        setConnectionState(false);
        setAlertStatus("success");
      })
      .catch(() => {
        setConnectionStatus("On");
        setAlertStatus("failure");
      });
  };

  const onClickClose = () => {
    setIsModalOpen(false);
  };

  const onClickCloseAction = () => {
    console.log("closeAlert");
  };

  return (
    <Settings
      connectionStatus={connectionStatus}
      onSwitchClick={onSwitchClick}
      isModalOpen={isModalOpen}
      onClickTurnOff={onClickTurnOff}
      onClickClose={onClickClose}
      onClickCloseAction={onClickCloseAction}
      alertStatus={alertStatus}
      connectionState={connectionState}
    />
  );
};

export const DefaultSettings = Template.bind({});
