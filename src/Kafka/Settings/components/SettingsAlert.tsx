import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  AlertVariant,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { AlertStatus } from "../types";

export type SettingsAlertProps = {
  alertStatus: AlertStatus;
  connectionState: boolean;
};

export const SettingsAlert: VoidFunctionComponent<SettingsAlertProps> = ({
  alertStatus,
  connectionState,
}) => {
  const { t } = useTranslation("kafka");

  const [isCloseActionClicked, setIsCloseActionClicked] =
    useState<boolean>(false);

  const closeAction = () => {
    setIsCloseActionClicked(true);
  };

  return (
    <AlertGroup isToast>
      {(() => {
        switch (alertStatus) {
          case "success":
            if (!isCloseActionClicked) {
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
            } else {
              return <></>;
            }
          case "danger":
            if (!isCloseActionClicked) {
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
              return <></>;
            }
          default:
            return null;
        }
      })()}
    </AlertGroup>
  );
};
