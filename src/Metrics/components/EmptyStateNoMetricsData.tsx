import {
  EmptyState,
  Title,
  EmptyStateIcon,
  EmptyStateVariant,
} from "@patternfly/react-core";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";
import React, { FunctionComponent } from "react";
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
