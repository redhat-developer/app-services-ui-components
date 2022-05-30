import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { ExclamationTriangleIcon } from "@patternfly/react-icons";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const EmptyStateNoMetricsData: FunctionComponent = () => {
  const { t } = useTranslation(["metrics"]);
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon
        icon={ExclamationTriangleIcon}
        color="var(--pf-global--warning-color--100)"
      />
      <Title headingLevel="h3" size="md">
        {t("metric_not_available")}
      </Title>
    </EmptyState>
  );
};
