import { VoidFunctionComponent } from "react";
import { Alert, AlertActionCloseButton, Card } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

export type MetricsLagAlertProps = {
  onClickClose: () => void;
};

export const MetricsLagAlert: VoidFunctionComponent<MetricsLagAlertProps> = ({
  onClickClose,
}) => {
  const { t } = useTranslation("metrics");
  return (
    <Card>
      <Alert
        isInline
        variant="info"
        title={t("metrics_lag_title")}
        actionClose={<AlertActionCloseButton onClose={onClickClose} />}
      >
        <p>{t("metrics_lag_description")}</p>
      </Alert>
    </Card>
  );
};
