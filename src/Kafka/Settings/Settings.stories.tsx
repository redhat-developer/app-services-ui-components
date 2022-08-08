import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Settings } from "./Settings";
import { apiError, fakeApi } from "../../shared/storiesHelpers";
import type { AlertStatus, SettingsStatus } from "./types";

export default {
  component: Settings,
  args: {
    connectionStatus: "On",
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = (args) => (
  <Settings {...args} />
);

export const InteractiveExample: ComponentStory<typeof Settings> = (args) => {
  const [connectionStatus, setConnectionStatus] =
    useState<SettingsStatus>("On");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [alertStatus, setAlertStatus] = useState<AlertStatus>();

  const [connectionState, setConnectionState] = useState<boolean>(false);

  const onSwitchClick = () => {
    if (connectionStatus === "On") {
      setIsModalOpen(true);
    } else {
      setConnectionStatus("TurningOn");
      apiError<{ ConfigurationOff: boolean }>(
        {
          ConfigurationOff: true,
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
          setAlertStatus("danger");
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
        setAlertStatus("danger");
      });
  };

  const onClickClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Settings
      {...args}
      connectionStatus={connectionStatus}
      onSwitchClick={onSwitchClick}
      isModalOpen={isModalOpen}
      onClickTurnOff={onClickTurnOff}
      onClickClose={onClickClose}
      alertStatus={alertStatus}
      connectionState={connectionState}
    />
  );
};

export const DefaultSettings = Template.bind({});

export const OnClickTurnOffSwitch = Template.bind({});
OnClickTurnOffSwitch.args = {
  isModalOpen: true,
};

export const TurningOffConnectionReauthentication = Template.bind({});
TurningOffConnectionReauthentication.args = {
  connectionStatus: "TurningOff",
};

export const TurningONConnectionReauthentication = Template.bind({});
TurningONConnectionReauthentication.args = {
  connectionStatus: "TurningOn",
};

export const TurnOffConnectionReauthentication = Template.bind({});
TurnOffConnectionReauthentication.args = {
  connectionStatus: "Off",
  alertStatus: "success",
  connectionState: false,
};

export const TurnONConnectionReauthentication = Template.bind({});
TurnONConnectionReauthentication.args = {
  connectionStatus: "On",
  alertStatus: "success",
  connectionState: true,
};

export const TurnONConnectionReauthenticationFail = Template.bind({});
TurnONConnectionReauthenticationFail.args = {
  connectionStatus: "Off",
  alertStatus: "danger",
};
