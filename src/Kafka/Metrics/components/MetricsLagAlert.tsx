import { VoidFunctionComponent } from "react";
import { Alert, AlertActionCloseButton, Card } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

export type MetricsLagAlertProps = {
  isClosed: boolean;
  onClickClose: () => void;
};

export const MetricsLagAlert: VoidFunctionComponent<MetricsLagAlertProps> = ({
  isClosed,
  onClickClose,
}) => {
  const { t } = useTranslation("metrics");

  if (!isClosed) {
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
  } else {
    return <> </>;
  }
};
