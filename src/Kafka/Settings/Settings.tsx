import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  AlertVariant,
  Button,
  Card,
  CardBody,
  Level,
  LevelItem,
  Modal,
  ModalVariant,
  Page,
  PageSection,
  Spinner,
  Switch,
  Title,
} from "@patternfly/react-core";
import type { AlertProps } from "@rhoas/app-services-ui-shared";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export type SettingsProps = {
  showAlert: AlertProps[];
  isChecked: boolean;
  isModalOpen: boolean;
  onChange: () => void;
  onDisable: () => void;
  onClose: () => void;
  closeAlertAction: (key: string | undefined) => void;
  isLoading: boolean;
};

export const Settings: FunctionComponent<SettingsProps> = ({
  showAlert,
  isChecked,
  onChange,
  isModalOpen,
  onDisable,
  onClose,
  closeAlertAction,
  isLoading,
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
        <PageSection isWidthLimited isCenterAligned>
          <Card>
            <CardBody>
              <Level>
                <LevelItem>
                  <Title headingLevel={"h3"}>
                    {t("settings.connection_re_authentication_label")}{" "}
                    {isChecked ? (
                      "On"
                    ) : isLoading ? (
                      <>
                        <Spinner
                          size="md"
                          aria-valuetext={"Turning off..."}
                          aria-label={"Turning off..."}
                        />{" "}
                        {"Turning off..."}
                      </>
                    ) : (
                      "Off"
                    )}
                  </Title>
                </LevelItem>
                <LevelItem>
                  <Switch
                    id="Connection-re-authentication-switch"
                    isChecked={isChecked}
                    onChange={onChange}
                  />
                  <Modal
                    variant={ModalVariant.small}
                    onClose={onClose}
                    isOpen={isModalOpen}
                    title={t("settings.warning_title")}
                    titleIconVariant={"warning"}
                    actions={[
                      <Button
                        key={"confirm"}
                        variant="primary"
                        onClick={onDisable}
                      >
                        {t("settings.disable")}
                      </Button>,
                      <Button key={"cancel"} variant="link" onClick={onClose}>
                        {t("common:cancel")}
                      </Button>,
                    ]}
                  >
                    {t("settings.warning_description")}
                  </Modal>
                </LevelItem>
              </Level>
            </CardBody>
          </Card>
        </PageSection>
      </Page>
      <AlertGroup isToast>
        {showAlert.map(({ title, variant, description, id }) => (
          <Alert
            title={title}
            variant={AlertVariant[variant]}
            actionClose={
              <AlertActionCloseButton onClose={() => closeAlertAction(id)} />
            }
            timeout={8000}
          >
            {description}
          </Alert>
        ))}
      </AlertGroup>
      <AlertGroup isToast>
        {showAlert.map(({ title, variant, description, id }) => (
          <Alert
            title={title}
            variant={AlertVariant[variant]}
            actionClose={
              <AlertActionCloseButton onClose={() => closeAlertAction(id)} />
            }
            timeout={8000}
          >
            {description}
          </Alert>
        ))}
      </AlertGroup>
    </>
  );
};
