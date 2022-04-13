import { VoidFunctionComponent } from "react";
import {
  Alert,
  AlertGroup,
  AlertVariant,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import { useTranslation, Trans } from "react-i18next";
import { CreateKafkaInstanceError } from "../machines";

export type FormAlertsProps = {
  error: CreateKafkaInstanceError | undefined;
  isTrial: boolean;
  onClickContactSupport: () => void;
  streamingUnits?: number;
  totalStreamingUnits?: number;
};

export const FormAlerts: VoidFunctionComponent<FormAlertsProps> = ({
  error,
  isTrial,
  onClickContactSupport,
  streamingUnits,
  totalStreamingUnits,
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
                  values={{ streamingUnits, totalStreamingUnits }}
                  components={[
                    <Button
                      key="btn-contact-support"
                      variant={ButtonVariant.link}
                      onClick={onClickContactSupport}
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
                {isTrial ? (
                  t("form_errors.trial_region_unavailable_message")
                ) : (
                  <Trans
                    ns={["create-kafka-instance-exp"]}
                    i18nKey={t("form_errors.region_unavailable_message")}
                    components={[
                      <Button
                        key="btn-contact-support"
                        variant={ButtonVariant.link}
                        onClick={onClickContactSupport}
                        isInline
                      />,
                    ]}
                  />
                )}
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
