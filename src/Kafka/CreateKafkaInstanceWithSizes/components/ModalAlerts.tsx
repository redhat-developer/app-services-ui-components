import {
  Alert,
  AlertGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  Spinner,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { InstanceAvailability, Plan } from "../types";

export type ModalAlertsProps = {
  plan?: Plan;
  instanceAvailability: InstanceAvailability | undefined;
  isSystemUnavailable: boolean;
  isLoading: boolean;
  onClickKafkaOverview: () => void;
  onClickContactUs: () => void;
  maxStreamingUnits: number | undefined;
};

export const ModalAlerts: VoidFunctionComponent<ModalAlertsProps> = ({
  plan,
  instanceAvailability,
  isSystemUnavailable,
  isLoading,
  onClickKafkaOverview,
  onClickContactUs,
  maxStreamingUnits,
}) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");

  return (
    <AlertGroup>
      {plan === "trial" && (
        <Alert
          role={"alert"}
          className="pf-u-mb-md"
          variant={AlertVariant.info}
          title={t("modal_alerts.trial_available_title")}
          isInline
        >
          <Trans
            ns={["create-kafka-instance-with-sizes"]}
            i18nKey="modal_alerts.trial_available_message"
            components={[
              <Button
                key="btn-pricing-purchasing"
                variant={ButtonVariant.link}
                onClick={onClickKafkaOverview}
                isInline
              />,
            ]}
            values={{ time: 48 }}
          />
        </Alert>
      )}
      {(() => {
        switch (true) {
          case isLoading:
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.info}
                title={t("checking_instance_title")}
                isInline
                customIcon={
                  <Spinner
                    size="md"
                    aria-valuetext={t("checking_instance_message")}
                  />
                }
              />
            );
          case isSystemUnavailable:
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.system_unavailable_title")}
                isInline
              >
                {t("modal_alerts.system_unavailable_message")}
              </Alert>
            );
          case instanceAvailability === "over-quota":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.over_quota_title")}
                isInline
              >
                <Trans
                  ns={["create-kafka-instance-with-sizes"]}
                  i18nKey={t("modal_alerts.over_quota_message")}
                  components={[
                    <Button
                      key="btn-contact-us"
                      variant={ButtonVariant.link}
                      onClick={onClickContactUs}
                      isInline
                    />,
                  ]}
                  values={{ maxStreamingUnits }}
                />
              </Alert>
            );
          case instanceAvailability === "trial-used":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.trial_used_title")}
                isInline
              >
                <Trans
                  ns={["create-kafka-instance-with-sizes"]}
                  i18nKey={t("modal_alerts.trial_used_message")}
                  components={[
                    <Button
                      key="btn-overview"
                      variant={ButtonVariant.link}
                      onClick={onClickKafkaOverview}
                      isInline
                    />,
                  ]}
                />
              </Alert>
            );
          case instanceAvailability === "trial-unavailable":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.trial_unavailable_title")}
                isInline
              >
                {t("modal_alerts.trial_unavailable_message")}
              </Alert>
            );
          case instanceAvailability === "regions-unavailable":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.instance_unavailable_title")}
                isInline
              >
                {t("modal_alerts.regions_unavailable_message")}
              </Alert>
            );
        }
        return null;
      })()}
    </AlertGroup>
  );
};
