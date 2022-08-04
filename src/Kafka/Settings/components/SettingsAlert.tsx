import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  AlertVariant,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

export type SettingsAlertProps = {
  alertStatus: "success" | "failure" | undefined;
  closeAction: () => void;
  connectionState: boolean;
};

export const SettingsAlert: VoidFunctionComponent<SettingsAlertProps> = ({
  alertStatus,
  closeAction,
  connectionState,
}) => {
  const { t } = useTranslation("kafka");

  return (
    <AlertGroup isToast>
      {(() => {
        switch (alertStatus) {
          case "success":
            return (
              <Alert
                variant={AlertVariant.success}
                title={
                  <Trans
                    ns={"kafka"}
                    i18nKey={"settings.success_alert"}
                    values={{
                      status: connectionState ? "On" : "Off",
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
