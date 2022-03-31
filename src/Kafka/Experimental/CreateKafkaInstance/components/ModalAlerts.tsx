import { VoidFunctionComponent } from "react";
import {
  Alert,
  AlertVariant,
  Spinner,
  AlertGroup,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import { useTranslation, Trans } from "react-i18next";
import { InstanceAvailability } from "../machines";

export type ModalAlertsProps = {
  instanceAvailability: InstanceAvailability | undefined;
  isSystemUnavailable: boolean;
  isLoading: boolean;
  onClickPricingAndPurchasing?: () => void;
};

export const ModalAlerts: VoidFunctionComponent<ModalAlertsProps> = ({
  instanceAvailability,
  isSystemUnavailable,
  isLoading,
  onClickPricingAndPurchasing,
}) => {
  const { t } = useTranslation("create-kafka-instance-exp");

  return (
    <AlertGroup>
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
          case instanceAvailability === "trial":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.info}
                title={t("modal_alerts.trial_available_title")}
                isInline
              >
                <Trans
                  ns={["create-kafka-instance-exp"]}
                  i18nKey="modal_alerts.trial_available_message"
                  components={[
                    <Button
                      key="btn-pricing-purchasing"
                      variant={ButtonVariant.link}
                      onClick={onClickPricingAndPurchasing}
                      isInline
                    />,
                  ]}
                  values={{ time: 48 }}
                />
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
                {t("modal_alerts.over_quota_message")}
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
                {t("modal_alerts.trial_used_message")}
              </Alert>
            );
          case instanceAvailability === "trial-unavailable":
          case instanceAvailability === "regions-unavailable":
          case instanceAvailability === "instance-unavailable":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.instance_or_region_unavailable_title")}
                isInline
              >
                {t("modal_alerts.instance_or_region_unavailable_message")}
              </Alert>
            );
        }
        return null;
      })()}
    </AlertGroup>
  );
};
