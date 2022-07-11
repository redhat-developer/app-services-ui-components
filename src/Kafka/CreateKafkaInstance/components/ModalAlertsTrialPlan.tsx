import {
  Alert,
  AlertGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  Spinner,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { TrialPlanAvailability } from "../types";

export type ModalAlertsTrialPlanProps = {
  instanceAvailability: TrialPlanAvailability;
  trialDurationInHours: number | undefined;
  onClickKafkaOverview: () => void;
};

export const ModalAlertsTrialPlan: VoidFunctionComponent<
  ModalAlertsTrialPlanProps
> = ({ instanceAvailability, trialDurationInHours, onClickKafkaOverview }) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");

  return (
    <AlertGroup>
      {(() => {
        switch (instanceAvailability) {
          case "unavailable":
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
          case "used":
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
          case "available":
            return (
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
                    trialDurationInHours ? <></> : <Spinner size={"sm"} />,
                  ]}
                  values={{
                    time: trialDurationInHours,
                  }}
                />
              </Alert>
            );
        }
      })()}
    </AlertGroup>
  );
};
