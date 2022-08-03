import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  AlertVariant,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

export type SettingsAlertProps = {
  isLoading: "success" | "failure" | undefined;
  isClicked: boolean;
  closeAction: () => void;
};

export const SettingsAlert: VoidFunctionComponent<SettingsAlertProps> = ({
  isLoading,
  closeAction,
  isClicked,
}) => {
  const { t } = useTranslation("kafka");

  return (
    <AlertGroup isToast>
      {(() => {
        switch (isLoading) {
          case "success":
            return (
              <Alert
                variant={AlertVariant.success}
                title={
                  <Trans
                    ns={"kafka"}
                    i18nKey={"settings.success_alert"}
                    values={{
                      status: isClicked ? "On" : "Off",
                    }}
                  />
                }
                actionClose={<AlertActionCloseButton onClose={closeAction} />}
                timeout={8000}
              />
            );
          case "failure":
            return (
              <Alert
                role={"alert"}
                variant={AlertVariant.danger}
                title={t("settings.error_alert_title")}
                actionClose={<AlertActionCloseButton onClose={closeAction} />}
              >
                {t("settings.error_alert_title_description")}
              </Alert>
            );
          default:
            return null;
        }
      })()}
    </AlertGroup>
  );
};
