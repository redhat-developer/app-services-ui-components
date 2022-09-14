import type { FunctionComponent } from "react";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  Flex,
  FlexItem,
  Modal,
  ModalVariant,
  PageSection,
  Spinner,
  Switch,
} from "@patternfly/react-core";
import { SettingsAlert } from "./components";
import type { AlertStatus, SettingsStatus } from "./types";
import "./Settings.css";

export type SettingsProps = {
  onSubmitReAuthentication: (
    reauthenticationEnabled: boolean
  ) => Promise<boolean>;
  reauthenticationEnabled: boolean;
};

export const Settings: FunctionComponent<SettingsProps> = ({
  onSubmitReAuthentication,
  reauthenticationEnabled,
}) => {
  const { t } = useTranslation("kafka");
  const reauthenticationStatus = reauthenticationEnabled ? "On" : "Off";
  //states
  const [connectionStatus, setConnectionStatus] = useState<SettingsStatus>(
    reauthenticationStatus
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [alertStatus, setAlertStatus] = useState<AlertStatus | undefined>();
  const [connectionState, setConnectionState] = useState<boolean>(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onChangeSwitch = (checked: boolean) => {
    if (connectionStatus === "On") {
      setIsModalOpen(true);
    } else {
      handleReAuthentication(checked);
    }
  };

  const handleReAuthentication = (reAuthValue: boolean) => {
    setConnectionStatus(reAuthValue ? "TurningOn" : "TurningOff");

    onSubmitReAuthentication(reAuthValue)
      .then((reauthentication) => {
        setConnectionStatus(reauthentication ? "On" : "Off");
        setConnectionState(reauthentication);
        setAlertStatus("success");
      })
      .catch(() => {
        setConnectionStatus(!reAuthValue ? "On" : "Off");
        setAlertStatus("danger");
      });
  };

  const onTurnOff = () => {
    setIsModalOpen(false);
    handleReAuthentication(false);
  };

  const clearAlert = useCallback(() => {
    setAlertStatus(undefined);
  }, []);

  return (
    <>
      <PageSection>
        <Card>
          <CardBody>{t("settings.kafka_instance_settings_label")}</CardBody>
        </Card>
      </PageSection>
      <PageSection>
        <Card className={"mas--settings__card"}>
          <CardBody>
            <Flex flexWrap={{ default: "nowrap" }}>
              <FlexItem grow={{ default: "grow" }}>
                <Flex>
                  <FlexItem component={"span"} spacer={{ default: "spacerSm" }}>
                    <strong>
                      {t("settings.connection_re_authentication_label")}
                      {":"}
                    </strong>
                  </FlexItem>
                  <FlexItem>
                    {(() => {
                      switch (connectionStatus) {
                        case "On":
                          return t(
                            "settings.Connection_re_authentication_states.on"
                          );
                        case "TurningOff":
                          return (
                            <>
                              <Spinner
                                size="md"
                                aria-valuetext={t(
                                  "settings.Connection_re_authentication_states.turning_off"
                                )}
                                aria-label={t(
                                  "settings.connection_re_authentication_label"
                                )}
                              />{" "}
                              {t(
                                "settings.Connection_re_authentication_states.turning_off"
                              )}
                            </>
                          );
                        case "Off":
                          return t(
                            "settings.Connection_re_authentication_states.off"
                          );
                        case "TurningOn":
                          return (
                            <>
                              <Spinner
                                size="md"
                                aria-valuetext={
                                  "settings.Connection_re_authentication_states.turning_on"
                                }
                                aria-label={t(
                                  "settings.connection_re_authentication_label"
                                )}
                              />{" "}
                              {t(
                                "settings.Connection_re_authentication_states.turning_on"
                              )}
                            </>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem>
                <Switch
                  id="Connection-re-authentication-switch"
                  aria-label={t("settings.connection_re_authentication_label")}
                  isChecked={
                    connectionStatus === "On" ||
                    connectionStatus === "TurningOff"
                  }
                  isDisabled={
                    connectionStatus === "TurningOff" ||
                    connectionStatus === "TurningOn"
                  }
                  onChange={onChangeSwitch}
                />
              </FlexItem>
              <Modal
                variant={ModalVariant.small}
                isOpen={isModalOpen}
                title={t("settings.warning_title")}
                titleIconVariant={"warning"}
                actions={[
                  <Button key={"confirm"} variant="primary" onClick={onTurnOff}>
                    {t("settings.turn_off_button_label")}
                  </Button>,
                  <Button key={"cancel"} variant="link" onClick={onClose}>
                    {t("common:cancel")}
                  </Button>,
                ]}
                onClose={onClose}
              >
                {t("settings.warning_description")}
              </Modal>
            </Flex>
          </CardBody>
        </Card>
      </PageSection>
      <SettingsAlert
        alertStatus={alertStatus}
        connectionState={connectionState}
        clearAlert={clearAlert}
      />
    </>
  );
};
