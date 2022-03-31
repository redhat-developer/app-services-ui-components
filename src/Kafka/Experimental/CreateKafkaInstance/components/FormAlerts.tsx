import { VoidFunctionComponent } from "react";
import { Alert, AlertGroup, AlertVariant } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { CreateKafkaInstanceError } from "../machines";

export type FormAlertsProps = {
  error: CreateKafkaInstanceError | undefined;
};

export const FormAlerts: VoidFunctionComponent<FormAlertsProps> = ({
  error,
}) => {
  const { t } = useTranslation("create-kafka-instance-exp");

  return (
    <AlertGroup aria-live="assertive">
      {(() => {
        switch (error) {
          case "form-invalid":
          case "name-taken":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.danger}
                title={t("form_errors.form_invalid")}
                isInline
              />
            );

          case "over-quota":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.danger}
                title={t("form_errors.over_quota_title")}
                isInline
              >
                {t("form_errors.over_quota_message")}
              </Alert>
            );

          case "trial-unavailable":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.danger}
                title={t("form_errors.trial_unavailable_title")}
                isInline
              >
                {t("form_errors.trial_unavailable_message")}
              </Alert>
            );

          case "unknown":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.danger}
                title={t("form_errors.unknown_error_title")}
                isInline
              >
                {t("form_errors.unknown_error_message")}
              </Alert>
            );
        }
        return null;
      })()}
    </AlertGroup>
  );
};
