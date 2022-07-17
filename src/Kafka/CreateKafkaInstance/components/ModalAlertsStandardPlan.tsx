import {
  Alert,
  AlertGroup,
  AlertVariant,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { StandardPlanAvailability } from "../types";

export type ModalAlertsStandardPlanProps = {
  instanceAvailability: StandardPlanAvailability;
  onClickContactUs: () => void;
};

export const ModalAlertsStandardPlan: VoidFunctionComponent<
  ModalAlertsStandardPlanProps
> = ({ instanceAvailability, onClickContactUs }) => {
  const { t } = useTranslation("create-kafka-instance");

  return (
    <AlertGroup>
      {(() => {
        switch (instanceAvailability) {
          case "over-quota":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.over_quota_title")}
                isInline
              >
                <Trans
                  ns={["create-kafka-instance"]}
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
          case "regions-unavailable":
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
          case "instance-unavailable":
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
          case "available":
            return null;
        }
      })()}
    </AlertGroup>
  );
};
