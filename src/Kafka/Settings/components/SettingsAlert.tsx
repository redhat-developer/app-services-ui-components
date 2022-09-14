import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  AlertVariant,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { AlertStatus } from "../types";

export type SettingsAlertProps = {
  alertStatus: AlertStatus;
  connectionState: boolean;
  clearAlert: () => void;
};

export const SettingsAlert: VoidFunctionComponent<SettingsAlertProps> = ({
  alertStatus,
  connectionState,
  clearAlert,
}) => {
  const { t } = useTranslation("kafka");

  const closeAction = () => {
    clearAlert && clearAlert();
  };

  return (
    <AlertGroup isToast>
      {(() => {
        if (alertStatus === "success") {
          return (
            <Alert
              variant={AlertVariant.success}
              title={
                <Trans
                  ns={"kafka"}
                  i18nKey={"settings.success_alert"}
                  values={{
                    status: connectionState ? "on" : "off",
                  }}
                />
              }
              actionClose={
                <AlertActionCloseButton
                  onClose={closeAction}
                  aria-label={"Success Alert close"}
                />
              }
              timeout={8000}
            />
          );
        } else if (alertStatus === "danger") {
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
        } else {
          return null;
        }
      })()}
    </AlertGroup>
  );
};
