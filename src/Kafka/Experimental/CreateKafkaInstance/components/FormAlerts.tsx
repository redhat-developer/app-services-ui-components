import {
  Alert,
  AlertGroup,
  AlertVariant,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CreateKafkaInstanceError } from "../types";

export type FormAlertsProps = {
  error: CreateKafkaInstanceError | undefined;
  onClickContactUS: () => void;
  streamingUnits?: number;
  maxStreamingUnits?: number;
};

export const FormAlerts: VoidFunctionComponent<FormAlertsProps> = ({
  error,
  onClickContactUS,
  streamingUnits,
  maxStreamingUnits,
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
                <Trans
                  ns={["create-kafka-instance-exp"]}
                  i18nKey={t("form_errors.over_quota_message")}
                  values={{ streamingUnits, maxStreamingUnits }}
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
          case "region-unavailable":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.danger}
                title={t("form_errors.instance_unavailable_title")}
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
