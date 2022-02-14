import { VoidFunctionComponent } from "react";
import { Alert, AlertVariant } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { CreateKafkaInstanceError } from "../machines";

export type FormAlertsProps = {
  error: CreateKafkaInstanceError | undefined;
};

export const FormAlerts: VoidFunctionComponent<FormAlertsProps> = ({
  error,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  switch (error) {
    case "form-invalid":
    case "name-taken":
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.danger}
          title={t("form_errors.form_invalid")}
          aria-live="polite"
          isInline
        />
      );

    case "over-quota":
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.danger}
          title={t("form_errors.over_quota_title")}
          aria-live="polite"
          isInline
        >
          {t("form_errors.over_quota_message")}
        </Alert>
      );

    case "trial-unavailable":
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.danger}
          title={t("form_errors.trial_unavailable_title")}
          aria-live="polite"
          isInline
        >
          {t("form_errors.trial_unavailable_message")}
        </Alert>
      );

    case "unknown":
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.danger}
          title={t("form_errors.unknown_error_title")}
          aria-live="polite"
          isInline
        >
          {t("form_errors.unknown_error_message")}
        </Alert>
      );
  }
  return null;
};
