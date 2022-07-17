import { Alert, AlertVariant } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const ModalAlertSystemUnavailable: VoidFunctionComponent = () => {
  const { t } = useTranslation("create-kafka-instance");

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
};
