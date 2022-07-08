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
import { StandardPlanAvailability } from "../types";

export type ModalAlertsStandardPlanProps = {
  instanceAvailability: StandardPlanAvailability;
  isSystemUnavailable: boolean;
  isLoading: boolean;
  onClickKafkaOverview: () => void;
  onClickContactUs: () => void;
};

export const ModalAlertsStandardPlan: VoidFunctionComponent<
  ModalAlertsStandardPlanProps
> = ({
  instanceAvailability,
  isSystemUnavailable,
  isLoading,
  onClickKafkaOverview,
  onClickContactUs,
}) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");

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
                />
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
          case instanceAvailability === "instance-unavailable":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.instance_unavailable_title")}
                isInline
              >
                {t("modal_alerts.instance_unavailable_message")}
              </Alert>
            );
        }
        return null;
      })()}
    </AlertGroup>
  );
};
