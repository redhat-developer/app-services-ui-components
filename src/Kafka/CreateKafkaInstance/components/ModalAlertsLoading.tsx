import { Alert, AlertVariant, Spinner } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const ModalAlertsLoading: VoidFunctionComponent = () => {
  const { t } = useTranslation("create-kafka-instance");

  return (
    <Alert
      role={"alert"}
      className="pf-u-mb-md"
      variant={AlertVariant.info}
      title={t("checking_instance_title")}
      isInline
      customIcon={
        <Spinner size="md" aria-valuetext={t("checking_instance_message")} />
      }
    />
  );
};
