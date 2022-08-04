import {
  Alert,
  AlertGroup,
  AlertVariant,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { CreateKafkaInstanceError } from "../types";

export type FormAlertsProps = {
  error: CreateKafkaInstanceError | "form-invalid" | undefined;
  onClickContactUS: () => void;
};

export const FormAlerts: VoidFunctionComponent<FormAlertsProps> = ({
  error,
  onClickContactUS,
}) => {
  const { t } = useTranslation("create-kafka-instance");

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

          case "insufficient-quota":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.danger}
                title={t("form_errors.out_of_quota_title")}
                isInline
              >
                <Trans
                  ns={["create-kafka-instance"]}
                  i18nKey={t("form_errors.out_of_quota_message")}
                  components={[
                    <Button
                      key="btn-contact-us"
                      variant={ButtonVariant.link}
                      onClick={onClickContactUS}
                      isInline
                    />,
                  ]}
                />
              </Alert>
            );
          case "developer-unavailable":
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
          case "region-unavailable":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.danger}
                title={t("form_errors.region_unavailable_title")}
                isInline
              >
                {t("form_errors.region_unavailable_message")}
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
