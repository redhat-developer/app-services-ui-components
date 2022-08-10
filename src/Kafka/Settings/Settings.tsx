import {
  Button,
  Card,
  CardBody,
  Flex,
  FlexItem,
  Modal,
  ModalVariant,
  Page,
  PageSection,
  Spinner,
  Switch,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { SettingsAlert } from "./components";
import type { AlertStatus, SettingsStatus } from "./types";

export type SettingsProps = {
  connectionStatus: SettingsStatus;
  onSwitchClick: () => void;
  isModalOpen: boolean;
  onClickTurnOff: () => void;
  alertStatus: AlertStatus;
  connectionState: boolean;
  onClickClose: () => void;
};

export const Settings: FunctionComponent<SettingsProps> = ({
  connectionStatus,
  onSwitchClick,
  isModalOpen,
  onClickTurnOff,
  alertStatus,
  onClickClose,
  connectionState,
}) => {
  const { t } = useTranslation("kafka");

  return (
    <>
      <PageSection>
        <Card>
          <CardBody>{t("settings.kafka_instance_settings_label")}</CardBody>
        </Card>
      </PageSection>
      <Page>
        <PageSection>
          <Card>
            <CardBody>
              <Flex flexWrap={{ default: "nowrap" }}>
                <FlexItem grow={{ default: "grow" }}>
                  <Flex>
                    <FlexItem
                      component={"span"}
                      spacer={{ default: "spacerSm" }}
                    >
                      <strong>
                        {t("settings.connection_re_authentication_title")}
                      </strong>
                    </FlexItem>
                    <FlexItem>
                      {(() => {
                        switch (connectionStatus) {
                          case "On":
                            return t(
                              "settings.Connection_re_authentication_states.turnon"
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
                              "settings.Connection_re_authentication_states.turnoff"
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
                    aria-label={t(
                      "settings.connection_re_authentication_label"
                    )}
                    isChecked={connectionStatus === "On"}
                    isDisabled={
                      connectionStatus === "TurningOff" ||
                      connectionStatus === "TurningOn"
                    }
                    onChange={onSwitchClick}
                  />
                </FlexItem>
                <Modal
                  variant={ModalVariant.small}
                  isOpen={isModalOpen}
                  title={t("settings.warning_title")}
                  titleIconVariant={"warning"}
                  actions={[
                    <Button
                      key={"confirm"}
                      variant="primary"
                      onClick={onClickTurnOff}
                    >
                      {t("settings.turn_off_button_label")}
                    </Button>,
                    <Button
                      key={"cancel"}
                      variant="link"
                      onClick={onClickClose}
                    >
                      {t("common:cancel")}
                    </Button>,
                  ]}
                  onClose={onClickClose}
                >
                  {t("settings.warning_description")}
                </Modal>
              </Flex>
            </CardBody>
          </Card>
        </PageSection>
      </Page>
      <SettingsAlert
        alertStatus={alertStatus}
        // closeAction={onClickCloseAction}
        connectionState={connectionState}
      />
    </>
  );
};
