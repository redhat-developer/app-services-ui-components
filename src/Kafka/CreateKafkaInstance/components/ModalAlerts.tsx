import { VoidFunctionComponent } from "react";
import {
  Alert,
  AlertVariant,
  Spinner,
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
  const { t } = useTranslation("create-kafka-instance");

  switch (true) {
    case isLoading:
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.info}
          title={t("checking_instance_title")}
          aria-live="polite"
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
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.warning}
          title={t("modal_alerts.system_unavailable_title")}
          aria-live="polite"
          isInline
        >
          {t("modal_alerts.system_unavailable_message")}
        </Alert>
      );
    case instanceAvailability === "trial":
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.info}
          title={t("modal_alerts.trial_available_title")}
          aria-live="polite"
          isInline
        >
          <Trans
            ns={["create-kafka-instance"]}
            i18nKey="modal_alerts.trial_available_message"
            components={[
              <Button
                key="btn-pricing-purchasing"
                variant={ButtonVariant.link}
                onClick={onClickPricingAndPurchasing}
                isInline
              />,
            ]}
          />
        </Alert>
      );
    case instanceAvailability === "over-quota":
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.warning}
          title={t("modal_alerts.over_quota_title")}
          aria-live="polite"
          isInline
        >
          {t("modal_alerts.over_quota_message")}
        </Alert>
      );
    case instanceAvailability === "trial-used":
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.warning}
          title={t("modal_alerts.trial_used_title")}
          aria-live="polite"
          isInline
        >
          {t("modal_alerts.trial_used_message")}
        </Alert>
      );
    case instanceAvailability === "trial-unavailable":
      return (
        <Alert
          id="mk-create-instance-quota-alert"
          className="pf-u-mb-md"
          variant={AlertVariant.warning}
          title={t("modal_alerts.trial_unavailable_title")}
          aria-live="polite"
          isInline
        >
          {t("modal_alerts.trial_unavailable_message")}
        </Alert>
      );
  }
  return null;
};
